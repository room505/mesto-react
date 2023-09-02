import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, onDeleteCard, buttonText }) {
  function handleSubmit(event) {
    event.preventDefault();
    onDeleteCard();
  }
  return (
    <PopupWithForm
      name={"confirmation"}
      title={"Вы уверены?"}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={true}
    />
  );
}

export default DeleteCardPopup;
