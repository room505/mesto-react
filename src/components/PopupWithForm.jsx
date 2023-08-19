function PopupWithForm({
  title,
  name,
  onSubmit,
  buttonText,
  isOpen,
  onClose,
  children,
  isDisable,
}) {
  const popupClassName = `popup popup_type_${name} ${isOpen && "popup_open"}`;
  const submitButtonClassName = `popup__save-edit ${
    isDisable && "popup__save-edit_inactive"
  }`;

  return (
    <div className={popupClassName} onClick={onClose}>
      <div
        className="popup__container"
        onClick={(evt) => evt.stopPropagation()}
      >
        <h2 className="popup__title">{title}</h2>
        <button className="popup__close" type="button" onClick={onClose} />
        <form
          className={`popup__form popup__form_type_${name}`}
          name={name}
          onSubmit={onSubmit}
        >
          {children}
          <button
            className={submitButtonClassName}
            type="submit"
            disabled={isDisable}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
