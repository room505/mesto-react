function PopupWithImage({ card, onClose }) {
  return (
    <div
      className={`popup popup_full-screen ${card.link ? "popup_opened" : ""}`}
    >
      <div className="popup__full-screen-card">
        <button className="popup__close" type="button" onClick={onClose} />
        <img
          src={card.link}
          alt={card.name}
          className="popup__full-screen-photo"
        />
        <p className="popup__title-for-photo">{card.name}</p>
      </div>
    </div>
  );
}

export default PopupWithImage;
