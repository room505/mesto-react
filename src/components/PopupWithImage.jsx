import usePopupClose from "../hooks/usePopupClose";

function PopupWithImage({ imageData, onClose, isOpen }) {
  usePopupClose(isOpen, onClose);
  return (
    <div
      className={
        isOpen
          ? "popup popup_full-screen popup_open"
          : "popup popup_full-screen"
      }
      onClick={onClose}
    >
      <div
        className="popup__full-screen-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="popup__close" type="button" onClick={onClose} />
        <img
          src={imageData?.link}
          alt={imageData?.name}
          className="popup__full-screen-photo"
        />
        <p className="popup__title-for-photo">{imageData?.name}</p>
      </div>
    </div>
  );
}

export default PopupWithImage;
