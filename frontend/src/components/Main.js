import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  setinfoCardForDelete,
  openDeleteCardPopup,
  cards,
  onCardLike,
  onCardClick,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <button
          onClick={onEditAvatar}
          className="profile__button-edit-avatar"
          aria-label="Редактировать фото пользователя"
          type="button"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        ></button>

        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            onClick={onEditProfile}
            aria-label="Редактировать"
            type="button"
            className="profile__edit-button"
          />
          <p className="profile__personal-info">{currentUser.about}</p>
        </div>

        <button
          onClick={onAddPlace}
          type="button"
          aria-label="Добавить карточку"
          className="profile__add-button"
        />
      </section>

      <section className="elements">
        {cards.reverse().map((card) => (
          <Card
            setinfoCardForDelete={setinfoCardForDelete}
            openDeleteCardPopup={openDeleteCardPopup}
            onCardLike={onCardLike}
            key={card._id}
            card={card}
            onCardClick={onCardClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
