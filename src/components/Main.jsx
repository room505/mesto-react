import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

export default function Main({
  onEditProfile,
  onAddCard,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__card">
          <button
            type="button"
            className="profile__avatar-button"
            onClick={onEditAvatar}
          >
            <img
              src={currentUser.avatar}
              alt="Аватарка"
              className="profile__avatar"
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__author">{currentUser.name}</h1>
            <button
              className="profile__button-edit"
              type="button"
              onClick={onEditProfile}
            />
            <p className="profile__about-the-author">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddCard}
        />
      </section>
      <section className="elements">
        {cards?.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}
