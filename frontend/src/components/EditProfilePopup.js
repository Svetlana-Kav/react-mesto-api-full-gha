import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useForm } from "../hooks/useForm";

function EditProfilePopup({
  isOpen,
  loading,
  onClose,
  closeByOverlay,
  onUpdateUser,
}) {
  const { values, handleChange, setValues } = useForm({});


  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    if (isOpen) {
      setValues({
        ...values,
        name: currentUser.name,
        about: currentUser.about,
      });
    }
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      loading={loading}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      closeByOverlay={closeByOverlay}
      name="edit-profile"
      title="Редактировать профиль"
      nameButton="Сохранить"
    >
      <label className="popup__form-field">
        <input
          onChange={handleChange}
          name="name"
          id="input-name"
          placeholder="Имя"
          value={values.name}
          required=""
          minLength={2}
          maxLength={40}
          className="popup__input popup__input_type_name"
          type="text"
        />
        <span className="input-name-error popup__form-input-error" />
      </label>
      <label className="popup__form-field">
        <input
          onChange={handleChange}
          name="about"
          id="input-info"
          placeholder="О себе"
          value={values.about}
          required=""
          minLength={2}
          maxLength={200}
          className="popup__input popup__input_type_info"
          type="text"
        />
        <span className="input-info-error popup__form-input-error" />
      </label>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
