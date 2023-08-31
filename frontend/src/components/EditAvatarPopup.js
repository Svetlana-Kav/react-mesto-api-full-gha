import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
  onUpdateAvatar,
  isOpen,
  loading,
  onClose,
  closeByOverlay,
}) {
  const inputElement = useRef();
  
  //обработка сабмита
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputElement.current.value,
    });
  }

  React.useEffect(() => {
    inputElement.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      loading={loading}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      closeByOverlay={closeByOverlay}
      name="add-avatar"
      title="Обновить аватар"
      nameButton="Сохранить"
    >
      <label className="popup__form-field">
        <input
          ref={inputElement}
          name="avatar"
          id="input-avatar"
          placeholder="Фото профиля"
          required=""
          className="popup__input popup__input_type_avatar"
          type="url"
        />
        <span className="input-avatar-error popup__form-input-error" />
      </label>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
