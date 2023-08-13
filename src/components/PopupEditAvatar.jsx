import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

const PopupEditAvatar = ({ isOpen, onClose, onUpdateAvatar, onLoading }) => {
  const avatarRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__set">
        <label className="popup__filed">
          <input
            type="url"
            className="popup__text-input popup__text-input_photo-link"
            name="avatar"
            placeholder="Ссылка на картинку"
            required
            id="avatar"
            ref={avatarRef}
          />
          <span className="popup__text-input-error avatar-error" />
        </label>
        <button className="popup__save-edit" type="submit">
          {onLoading ? "Сохранение..." : "Сохранить"}
        </button>
      </fieldset>
    </PopupWithForm>
  );
};

export default PopupEditAvatar;

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
