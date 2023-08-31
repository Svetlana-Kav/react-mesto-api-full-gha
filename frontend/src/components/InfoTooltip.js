import { usePopupClose } from "../hooks/usePopupClose";

function InfoTooltip({ closeByOverlay, isOpen, onClose, title, image }) {

  usePopupClose(isOpen, onClose);
  return (
    <div
      onMouseDown={closeByOverlay}
      className={isOpen ? `popup  popup_opened` : `popup`}
    >
      <div className="popup__container">
        <button
          onClick={onClose}
          type="button"
          aria-label="Закрыть окно редактирования"
          className={`popup__close-icon`}
        />
        <img alt={title} className="popup__tooltip-image" src={image} />
        <h2 className="popup__tooltipe-title">{title}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
