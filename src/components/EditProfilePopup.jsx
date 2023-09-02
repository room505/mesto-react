import { useState, useEffect, useContext, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "react-hook-form";
import usePopupClose from "../hooks/usePopupClose";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonText }) {

  const currentUser = useContext(CurrentUserContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    reset();
    setValue("name", currentUser?.name);
    setValue("about", currentUser?.about);
  }, [isOpen, currentUser]);

  function onSubmit(data) {
    onUpdateUser({ name: data.name, about: data.about });
  }
  usePopupClose(isOpen, onClose);
  return (
    <PopupWithForm
      name={"profile"}
      title={"Редактировать профиль"}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
    >
      <label className="popup__filed">
        <input
          placeholder="Введите имя"
          className="popup__text-input"
          maxLength={40}
          {...register("name", {
            required: "Заполните это поле.",
            minLength: {
              value: 2,
              message: "Текст должен быть не короче 2 симв.",
            },
          })}
        />
        <span className="popup__text-input-error">{errors.name?.message}</span>
      </label>
      <label className="popup__filed">
        <input
          placeholder="О себе"
          type="text"
          className="popup__text-input"
          maxLength={200}
          {...register("about", {
            required: "Заполните это поле.",
            minLength: {
              value: 2,
              message: "Текст должен быть не короче 2 симв.",
            },
          })}
        />
        <span className="popup__text-input-error">{errors.about?.message}</span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
