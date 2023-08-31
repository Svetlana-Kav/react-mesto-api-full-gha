import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({
  onCardClick,
  card,
  onCardLike,
  openDeleteCardPopup,
  setinfoCardForDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    onCardClick({
      name: card.name,
      link: card.link,
      isActive: true,
    });
  }

  const isOwn = card.owner === currentUser._id;

  const isLiked = card.likes.some((i) => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like-button ${
    isLiked && "element__like-button_active"
  }`;

  function handleLike() {
    onCardLike(card);
  }

  function handleDelete() {
    openDeleteCardPopup(true);
    setinfoCardForDelete(card);
  }

  return (
    <article className="element">
      {isOwn && (
        <button
          onClick={handleDelete}
          aria-label="Удалить карточку"
          className="element__delete-button"
        />
      )}
      <img
        onClick={handleClick}
        className="element__image"
        src={card.link}
        alt={card.name}
      />
      <h2 className="element__text">{card.name}</h2>
      <div className="element__like">
        <button
          onClick={handleLike}
          type="button"
          aria-label="Поставить лайк"
          className={cardLikeButtonClassName}
        />
        <p className="element__sum-likes">{card.likes.length}</p>
      </div>
    </article>
  );
}

export default Card;
