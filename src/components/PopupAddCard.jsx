import React, { useContext, useEffect } from "react";
import useForm from "../utils/useForm";
import PopupWithForm from "./PopupWithForm";

const PopupAddCard = ({ isOpen, onClose, onAddPlace, onLoading }) => {
  const { enteredValues, errors, handleChange, isFormValid, resetForm } =
    useForm();

  const handleSubmit = (event) => {
    event.preventDefault();

    onAddPlace({
      name: enteredValues.title,
      link: enteredValues.link,
    });
  };

  useEffect(() => {
    resetForm();
  }, [resetForm, isOpen]);

  return (
    <PopupWithForm
      name="new-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__filed">
        <input
          type="text"
          className="popup__text-input popup__text-input_title-card"
          name="name"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required=""
          id="title"
          onChange={handleChange}
          value={enteredValues.title || ""}
        />
        {errors.title && (
          <span className="popup__text-input-error title-error">
            {errors.title}
          </span>
        )}
      </label>
      <label className="popup__filed">
        <input
          type="url"
          className="popup__text-input popup__text-input_photo-link"
          name="link"
          placeholder="Ссылка на картинку"
          required=""
          id="link"
          onChange={handleChange}
          value={enteredValues.link || ""}
        />
        {errors.title && (
          <span className="popup__text-input-error link-error">
            {errors.title}
          </span>
        )}
      </label>
      <button
        className="popup__save-edit"
        type="submit"
        disabled={!isFormValid}
      >
        {onLoading ? "Сохранение..." : "Создать"}
      </button>
    </PopupWithForm>
  );
};

export default PopupAddCard;
