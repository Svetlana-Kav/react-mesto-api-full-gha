import { usePopupClose } from "../hooks/usePopupClose";

function ImagePopup({ closeByOverlay, card, onClose }) {
  usePopupClose(card?.link, onClose);

  return (
    <div
      onMouseDown={closeByOverlay}
      className={
        card.isActive
          ? "popup popup_type_photo-viewer popup_opened"
          : "popup popup_type_photo-viewer"
      }
    >
      <div className="popup__photo-viewer">
        <button
          onClick={onClose}
          type="button"
          aria-label="Закрыть окно просмотра фото"
          className="popup__close-icon  popup__close-icon_type_photo-viewer"
        />
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__name-image">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
