import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card.name, card.link);
  }
  function handleToggleLike() {
    onCardLike(card);
  }
  function handleDeleteCard() {
    onCardDelete(card._id);
    console.log(isOwn);
  }

  return (
    <article className="element">
      {isOwn && (
        <button
          aria-label="Delete"
          type="button"
          className="element__delete-button"
          onClick={handleDeleteCard}
        />
      )}
      <img
        alt={card.name}
        src={card.link}
        className="element__photo"
        onClick={handleClick}
      />
      <div className="element__content">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button
            type="button"
            className={`element__like ${isLiked && "element__like_active"}`}
            onClick={handleToggleLike}
          />
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
