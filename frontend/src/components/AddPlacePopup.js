import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";

function AddPlacePopup({
  isOpen,
  onAddPlace,
  loading,
  onClose,
  closeByOverlay,
}) {
  const { values, handleChange, setValues } = useForm({});

  React.useEffect(() => {
    setValues({ ...values, name: "", link: "" });
  }, [isOpen]);


  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }

  return (
    <PopupWithForm
      loading={loading}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      closeByOverlay={closeByOverlay}
      name="add-card"
      title="Новое место"
      nameButton="Создать"
    >
      <label className="popup__form-field">
        <input
          onChange={handleChange}
          name="name"
          id="input-name-card"
          minLength={2}
          maxLength={30}
          placeholder="Название"
          required=""
          className="popup__input popup__input_type_name-card"
          type="text"
          value={values.name || ''}
        />
        <span className="input-name-card-error popup__form-input-error" />
      </label>
      <label className="popup__form-field">
        <input
          onChange={handleChange}
          name="link"
          id="input-link"
          placeholder="Ссылка на картинку"
          required=""
          className="popup__input popup__input_type_link-image"
          type="url"
          value={values.link || ''}
        />
        <span className="input-link-error popup__form-input-error" />
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
