import { useRef, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, buttonText }) {
  const input = useRef();
  const [error, setError] = useState();
  const [resetSubmitButton, setResetSubmitButton] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: input.current.value });
    input.current.value = "";
  }
  function closePopup() {
    onClose();
    input.current.value = "";
    setError("");
  }
  //валидация
  function getLinkError() {
    setError(input.current.validationMessage);
    validation();
  }
  function validation() {
    input.current.checkValidity()
      ? setResetSubmitButton(false)
      : setResetSubmitButton(true);
  }
  useEffect(() => {
    isOpen ? validation() : setResetSubmitButton(false);
  }, [isOpen]);

  return (
    <PopupWithForm
      name={"avatar"}
      title={"Обновить аватар"}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={closePopup}
      onSubmit={handleSubmit}
      isDisable={resetSubmitButton}
    >
      <label className="popup__filed">
        <input
          placeholder="Ссылка на картинку"
          type="url"
          className="popup__text-input"
          required
          onChange={getLinkError}
          ref={input}
        />
        <span
          className={`popup__text-input-error ${
            resetSubmitButton && "popup__text-input-error_active"
          }`}
        >
          {error}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
