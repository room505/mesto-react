import { useEffect, useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddCard, buttonText }) {
  //*Строки
  const inputTitle = useRef();
  const inputLink = useRef();
  //*Ошибки формы и сброс формы
  const [error, setError] = useState({ name: "", link: "" });
  const [resetSubmitButton, setResetSubmitButton] = useState(false);
  const errorClassName = `popup__text-input-error ${
    resetSubmitButton && "popup__text-input-error_active"
  }`;

  //*Сабмит
  function handleSubmit(e) {
    e.preventDefault();
    onAddCard({
      name: inputTitle.current.value,
      link: inputLink.current.value,
    });
    inputTitle.current.value = "";
    inputLink.current.value = "";
  }

  //*Закрыть окно
  function closePopup() {
    onClose();
    inputTitle.current.value = "";
    inputLink.current.value = "";
    setError({ name: "", link: "" });
  }

  //*Валидация формы
  function getTitleError() {
    setError({ ...error, name: inputTitle.current.validationMessage });
    validation();
  }
  function getLinkError() {
    setError({ ...error, link: inputLink.current.validationMessage });
    validation();
  }
  function validation() {
    inputTitle.current.checkValidity() && inputLink.current.checkValidity()
      ? setResetSubmitButton(false)
      : setResetSubmitButton(true);
  }

  useEffect(() => {
    isOpen ? validation() : setResetSubmitButton(false);
  }, [isOpen]);

  return (
    <PopupWithForm
      name={"add-card"}
      title={"Новое место"}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={closePopup}
      onSubmit={handleSubmit}
      isDisable={resetSubmitButton}
    >
      <label className="popup__filed">
        <input
          type="text"
          className="popup__text-input"
          name="name"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required
          onChange={getTitleError}
          ref={inputTitle}
        />
        <span className={errorClassName}>{error.name}</span>
      </label>
      <label className="popup__filed">
        <input
          type="url"
          className="popup__text-input"
          placeholder="Ссылка на картинку"
          required
          onChange={getLinkError}
          ref={inputLink}
        />
        <span className={errorClassName}>{error.link}</span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
