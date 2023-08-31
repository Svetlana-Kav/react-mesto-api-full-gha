import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({
  loading,
  handleCardDelete,
  isOpen,
  onClose,
  closeByOverlay,
}) {


  function handleSubmit(e) {
    e.preventDefault();

    handleCardDelete();
  }

  return (
    <PopupWithForm
      loading={loading}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      closeByOverlay={closeByOverlay}
      name="delete-card"
      title="Вы уверены?"
      nameButton="Да"
    ></PopupWithForm>
  );
}

export default DeleteCardPopup;
