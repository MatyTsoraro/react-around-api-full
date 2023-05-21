import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image-overlay" onClick={onEditAvatarClick}>
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="User's Profile Pic"
          />
        </div>
        <div className="profile__info">
          <div className="profile__person">
            <h1 className="profile__name">{currentUser.name}</h1>

            <button
              className="profile__edit-button"
              type="button"
              aria-label="open-edit-profile-modal"
              onClick={onEditProfileClick}
            />
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="open-new-card-modal"
          onClick={onAddPlaceClick}
        />
      </section>

      <section className="postcards">
        <ul className="postcards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              likesCounter={card.likes.length}
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
              card={card}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
