const PopupWithConfirmation = ({
  isOpen,
  onClose,
  onLoading,
  card,
  onSubmit,
}) => {
  const handleConfirmation = (event) => {
    event.preventDefault();
    onSubmit(card);
  };
  return (
    <div className={`popup popup_delete-card ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <h2 className="popup__title popup__title_delete">Вы уверены?</h2>
        <button className="popup__close" type="button" onClick={onClose} />
        <form
          className="popup__form popup__form_delete-card"
          id="delete-card"
          name="delete-card"
          noValidate=""
        >
          <button
            className="popup__save-edit popup__save-edit_delete-card"
            type="submit"
            onSubmit={handleConfirmation}
          >
            {onLoading ? "Сохранение..." : "Да"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithConfirmation;
