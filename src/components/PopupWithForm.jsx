const PopupWithForm = (props) => {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_open" : ""
      }`}
    >
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        />
        <form
          className="popup__form form"
          name={`${props.name}`}
          action="#"
          onSubmit={props.onSubmit}
        >
          {props.children}
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;

// import React, { Component } from "react";

// export default class PopupWithForm extends Component {
//   render() {
//     return (
//       <div>
//         <section className="popup popup_type_edit-profile">
//           <div className="popup__container">
//             <h2 className="popup__title">Редактировать профиль</h2>
//             <button className="popup__close" type="button" />
//             <form
//               className="popup__form popup__form_type_edit-profile"
//               id="editProfile"
//               name="editProfile"
//               noValidate=""
//             >
//               <label className="popup__filed">
//                 <input
//                   type="text"
//                   className="popup__text-input popup__text-input_edit_author"
//                   name="name"
//                   minLength={2}
//                   maxLength={40}
//                   required=""
//                   id="name"
//                   placeholder="Имя"
//                 />
//                 <span className="popup__text-input-error name-error" />
//               </label>
//               <label className="popup__filed">
//                 <input
//                   type="text"
//                   className="popup__text-input popup__text-input_edit_about-the-author"
//                   name="editAboutTheAuthor"
//                   minLength={2}
//                   maxLength={200}
//                   required=""
//                   id="about"
//                   placeholder="О себе"
//                 />
//                 <span className="popup__text-input-error about-error" />
//               </label>
//               <button className="popup__save-edit" type="submit">
//                 Сохранить
//               </button>
//             </form>
//           </div>
//         </section>
//         <section className="popup popup_type_add-card">
//           <div className="popup__container">
//             <h2 className="popup__title">Новое место</h2>
//             <button className="popup__close" type="button" />
//             <form
//               className="popup__form popup__form_type_add-card"
//               id="addCard"
//               name="addCard"
//               noValidate=""
//             >
//               <label className="popup__filed">
//                 <input
//                   type="text"
//                   className="popup__text-input popup__text-input_title-card"
//                   name="name"
//                   placeholder="Название"
//                   minLength={2}
//                   maxLength={30}
//                   required=""
//                   id="title"
//                 />
//                 <span className="popup__text-input-error title-error" />
//               </label>
//               <label className="popup__filed">
//                 <input
//                   type="url"
//                   className="popup__text-input popup__text-input_photo-link"
//                   name="link"
//                   placeholder="Ссылка на картинку"
//                   required=""
//                   id="link"
//                 />
//                 <span className="popup__text-input-error link-error" />
//               </label>
//               <button className="popup__save-edit" type="submit">
//                 Создать
//               </button>
//             </form>
//           </div>
//         </section>
//         <section className="popup popup_full-screen">
//           <div className="popup__full-screen-card">
//             <button className="popup__close" type="button" />
//             <img src="#" alt="" className="popup__full-screen-photo" />
//             <p className="popup__title-for-photo" />
//           </div>
//         </section>
//         <section className="popup popup_delete-card">
//           <div className="popup__container">
//             <h2 className="popup__title popup__title_delete">Вы уверены?</h2>
//             <button className="popup__close" type="button" />
//             <form
//               className="popup__form popup__form_delete-card"
//               id="delete-card"
//               name="delete-card"
//               noValidate=""
//             >
//               <button
//                 className="popup__save-edit popup__save-edit_delete-card"
//                 type="submit"
//               >
//                 Да
//               </button>
//             </form>
//           </div>
//         </section>
//         <section className="popup popup_type_edit-avatar">
//           <div className="popup__container">
//             <h2 className="popup__title">Обновить аватар</h2>
//             <button className="popup__close" type="button" />
//             <form
//               className="popup__form popup__form_type_edit-avatar"
//               id="editAvatar"
//               name="editAvatar"
//               noValidate=""
//             >
//               <label className="popup__filed">
//                 <input
//                   type="url"
//                   className="popup__text-input popup__text-input_photo-link"
//                   name="avatar"
//                   placeholder="Ссылка на картинку"
//                   required=""
//                   id="avatar"
//                 />
//                 <span className="popup__text-input-error avatar-error" />
//               </label>
//               <button className="popup__save-edit" type="submit">
//                 Сохранить
//               </button>
//             </form>
//           </div>
//         </section>
//       </div>
//     );
//   }
// }
