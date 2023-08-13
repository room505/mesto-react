import { useState } from "react";
import React from "react";

import api from "../src/components/Api";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import PopupWithImage from "./components/PopupWithImage";
import PopupEditProfile from "./components/PopupEditProfile";
import PopupEditAvatar from "././components/PopupEditAvatar";
import PopupAddCard from "./components/PopupAddCard";
import PopupWithConfirmation from "./components/PopupWithConfirmation";

import { CurrentUserContext } from "./contexts/CurrentUserContext";

export default function App() {
  const [editAvatarPopup, setEditAvatarPopup] = React.useState(false);
  const [editProfilePopup, setEditProfilePopup] = React.useState(false);
  const [addCardPopup, setAddCardPopup] = React.useState(false);
  const [confirmationPopupOpen, setConfirmationPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [removeCardId, setRemoveCardId] = React.useState("");

  const closePopup = () => {
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setAddCardPopup(false);
    setConfirmationPopupOpen(false);
    setSelectedCard({});
  };

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  }, []);

  const handleEditAvatar = () => {
    setEditAvatarPopup(!editAvatarPopup);
  };
  const handleEditProfile = () => {
    setEditProfilePopup(!editProfilePopup);
  };
  const handleAddCard = () => {
    setAddCardPopup(!addCardPopup);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => {
          state.map((c) => (c._id === card._id ? newCard : c));
        });
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  };

  const handleCardDeleteClick = (cardId) => {
    setConfirmationPopupOpen(!confirmationPopupOpen);
    setRemoveCardId(cardId);
  };

  function handleCardDelete(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== cardId));
        closePopup();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  }

  const handleUpdateUser = (newUserInfo) => {
    setIsLoading(true);
    api
      .setUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        closePopup();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = (newData) => {
    setIsLoading(true);
    api
      .setUserAvatar(newData)
      .then((data) => {
        setCurrentUser(data);
        closePopup();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddPlaceSubmit = (newData) => {
    setIsLoading(true);
    api
      .addCard(newData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closePopup();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatar}
          onEditProfile={handleEditProfile}
          onAddPlace={handleAddCard}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDeleteClick={handleCardDeleteClick}
        />
        <Footer />

        <PopupEditAvatar
          isOpen={editProfilePopup}
          onClose={closePopup}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
        />

        <PopupEditProfile
          isOpen={editProfilePopup}
          onClose={closePopup}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
        />

        <PopupAddCard
          isOpen={addCardPopup}
          onClose={closePopup}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={isLoading}
        />

        <PopupWithConfirmation
          isOpen={confirmationPopupOpen}
          onClose={closePopup}
          onLoading={isLoading}
          onSubmit={handleCardDelete}
          card={removeCardId}
        />

        <PopupWithImage card={selectedCard} onClose={closePopup} />
      </div>
    </CurrentUserContext.Provider>
  );
}
