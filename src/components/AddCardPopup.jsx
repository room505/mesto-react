import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "react-hook-form";

function AddPlacePopup({ isOpen, onClose, onAddCard, buttonText }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    reset();
  }, [isOpen]);

  //*Сабмит
  function onSubmit(data) {
    onAddCard({ name: data.name, link: data.link });
  }

  return (
    <PopupWithForm
      name={"add-card"}
      title={"Новое место"}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
    >
      <label className="popup__filed">
        <input
          type="text"
          className="popup__text-input"
          name="name"
          placeholder="Название"
          maxLength={30}
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
          type="url"
          className="popup__text-input"
          placeholder="Ссылка на картинку"
          {...register("link", {
            required: "Заполните это поле.",
            pattern: {
              value:
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
              message: "Введите URL.",
            },
          })}
        />
        <span className="popup__text-input-error">{errors.link?.message}</span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
