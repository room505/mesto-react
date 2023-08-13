import React, { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useForm from "../utils/useForm";

const PopupEditProfile = ({ isOpen, onClose, onUpdateUser, onLoading }) => {
  const currentUser = useContext(CurrentUserContext);

  const { enteredValues, errors, handleChange, isFormValid, resetForm } =
    useForm();

  const handleSubmit = (event) => {
    event.preventDefault();

    onUpdateUser({
      name: enteredValues.name,
      about: enteredValues.about,
    });
  };

  useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [resetForm, isOpen, currentUser]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__filed">
        <input
          type="text"
          className="popup__text-input"
          name="name"
          minLength={2}
          maxLength={40}
          required=""
          id="name"
          placeholder="Имя"
          value={enteredValues.name || ""}
          onChange={handleChange}
        />
        {errors.name && (
          <span className="popup__text-input-error name-error">
            {errors.name}
          </span>
        )}
      </label>
      <label className="popup__filed">
        <input
          type="text"
          className="popup__text-input"
          name="editAboutTheAuthor"
          minLength={2}
          maxLength={200}
          required=""
          id="about"
          placeholder="О себе"
          value={enteredValues.about || ""}
          onChange={handleChange}
        />
        {errors.name && (
          <span className="popup__text-input-error about-error">
            {errors.name}
          </span>
        )}
      </label>
      <button
        className="popup__save-edit"
        type="submit"
        disabled={!isFormValid}
      >
        {onLoading ? "Сохранение..." : "Сохранить"}
      </button>
    </PopupWithForm>
  );
};

export default PopupEditProfile;

//   <input
//     type="text"
//     className="popup__text-input popup__text-input_edit_author"
//     name="name"
//     minLength={2}
//     maxLength={40}
//     required=""
//     id="name"
//     placeholder="Имя"
//   />
//   <span className="popup__text-input-error name-error" />
// </label>
// <label className="popup__filed">
//   <input
//     type="text"
//     className="popup__text-input popup__text-input_edit_about-the-author"
//     name="editAboutTheAuthor"
//     minLength={2}
//     maxLength={200}
//     required=""
//     id="about"
//     placeholder="О себе"
//   />
//   <span className="popup__text-input-error about-error" />
// </label>
// <button className="popup__save-edit" type="submit">
//   Сохранить
// </button>
//           <label className="popup__filed">
