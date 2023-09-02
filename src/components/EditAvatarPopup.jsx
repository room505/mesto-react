import { useRef, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "react-hook-form";
import usePopupClose from "../hooks/usePopupClose";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, buttonText }) {

  usePopupClose(isOpen, onClose);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    reset();
  }, [isOpen]);

  function onSubmit(data) {
    onUpdateAvatar({ avatar: data.avatar });
  }

  return (
    <PopupWithForm
      name={"avatar"}
      title={"Обновить аватар"}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
    >
      <label className="popup__filed">
        <input
          placeholder="Ссылка на картинку"
          className="popup__text-input"
          {...register("avatar", {
            required: "Заполните это поле.",
            pattern: {
              value:
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
              message: "Введите URL.",
            },
          })}
        />
        <span className="popup__text-input-error">
          {errors.avatar?.message}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
