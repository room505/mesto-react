import React, { useState, useEffect } from "react";
import "../pages/index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddCardPopup from "./AddCardPopup";
import DeleteCardPopup from "./DeleteCardPopup";
import PopupWithImage from "./PopupWithImage";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CurrentCardContext } from "../contexts/CurrentCardContext";
import { api } from "../utils/Api.js";

export default function App() {
  //*Инфо
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState(null);

  useEffect(() => {
    api.getUserInfo().then(setCurrentUser).catch(api.catch);
    api.getInitialCards().then(setCards).catch(api.catch);
  }, []);

  //*Save button
  const [buttonText, setButtonText] = useState({
    user: "Сохранить",
    card: "Создать",
    confirmation: "Да",
  });


  function handleEditProfile(data) {
    setButtonText({ ...buttonText, user: "Сохранение..." });
    setTimeout(() => {
      api
        .editUserInfo(data)
        .then((res) =>
          setCurrentUser({ ...currentUser, name: res.name, about: res.about })
        )
        .catch(api.catch)
        .finally(setButtonText({ ...buttonText, user: "Сохранить" }));
      closePopup();
    }, 300);
  }
  function handleEditAvatar(data) {
    setButtonText({ ...buttonText, user: "Сохранение..." });
    setTimeout(() => {
      api
        .editAvatar(data)
        .then((res) => setCurrentUser({ ...currentUser, avatar: res.avatar }))
        .catch(api.catch)
        .finally(setButtonText({ ...buttonText, user: "Сохранить" }));
      closePopup();
    }, 300);
  }
  function handleAddCard(data) {
    setButtonText({ ...buttonText, card: "Сохранение..." });
    setTimeout(() => {
      api
        .addNewCard(data)
        .then((newCard) => setCards([newCard, ...cards]))
        .catch(api.catch)
        .finally(setButtonText({ ...buttonText, card: "Создать" }));
      closePopup();
    }, 300);
  }
  function handleDeleteCard() {
    setButtonText({ ...buttonText, confirmation: "Удаление..." });
    setTimeout(() => {
      api
        .deleteCard(cardId)
        .then(setCards((cards) => cards.filter((card) => card._id != cardId)))
        .catch(api.catch)
        .finally(setButtonText({ ...buttonText, card: "Да" }));
      closePopup();
    }, 300);
  }

  const [popup, setPopup] = useState({
    profile: false,
    card: false,
    avatar: false,
    confirmation: false,
    image: false,
  });
  function handleEditProfileClick() {
    setPopup({ ...popup, profile: true });
  }
  function handleEditAvatarClick() {
    setPopup({ ...popup, avatar: true });
  }
  function handleAddPCardClick() {
    setPopup({ ...popup, card: true });
  }
  const [cardId, setCardId] = useState(null);
  function handleConfirmDeleteCardClick(id) {
    setPopup({ ...popup, confirmation: true });
    setCardId(id);
  }
  const [imageLink, setImageLink] = useState(null);
  function handleCardClick(name, link) {
    setPopup({ ...popup, image: true });
    setImageLink({ name: name, link: link });
  }

  function closePopup() {
    setPopup({
      profile: false,
      card: false,
      avatar: false,
      confirmation: false,
      image: false,
    });
  }

  function handleToggleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLike(card._id, isLiked)
      .then((newCard) =>
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        )
      )
      .catch(api.catch);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentCardContext.Provider value={cards}>
        <div className="page">
          <Header />
          <Main
            cards={cards}
            onAddCard={handleAddPCardClick}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleToggleCardLike}
            onCardDelete={handleConfirmDeleteCardClick}
          />
          <Footer />
          <EditProfilePopup
            isOpen={popup.profile}
            onClose={closePopup}
            onUpdateUser={handleEditProfile}
            buttonText={buttonText.user}
          />
          <AddCardPopup
            isOpen={popup.card}
            onClose={closePopup}
            onAddCard={handleAddCard}
            buttonText={buttonText.card}
          />
          <EditAvatarPopup
            isOpen={popup.avatar}
            onClose={closePopup}
            onUpdateAvatar={handleEditAvatar}
            buttonText={buttonText.user}
          />
          <DeleteCardPopup
            isOpen={popup.confirmation}
            onClose={closePopup}
            onDeleteCard={handleDeleteCard}
            buttonText={buttonText.confirmation}
          />
          <PopupWithImage
            imageData={imageLink}
            onClose={closePopup}
            isOpen={popup.image}
          />
        </div>
      </CurrentCardContext.Provider>
    </CurrentUserContext.Provider>
  );
}
