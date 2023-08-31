import { usePopupClose } from "../hooks/usePopupClose";

function PopupWithForm({
  closeByOverlay,
  isOpen,
  name,
  onClose,
  onSubmit,
  title,
  nameButton,
  children,
  loading,
}) {

  usePopupClose(isOpen, onClose);
  return (
    <div
      onMouseDown={closeByOverlay}
      className={
        isOpen
          ? `popup popup_type_${name} popup_opened`
          : `popup popup_type_${name}`
      }
    >
      <div className="popup__container">
        <button
          onClick={onClose}
          type="button"
          aria-label="Закрыть окно редактирования"
          className={`popup__close-icon popup__close-icon_type_${name}`}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          onSubmit={onSubmit}
          name={name}
          className={`popup__form popup__form-${name}`}
        >
          {children}

          <button
            aria-label="Сохранить"
            className={`popup__submit-button popup__submit-button_type_${name}`}
          >
            {loading ? "Сохранение..." : nameButton}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
