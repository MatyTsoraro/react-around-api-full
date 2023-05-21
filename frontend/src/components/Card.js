import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, likesCounter, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  // Checking if the current user is the owner of the current card
  const isOwn = card.owner === currentUser._id;

  // Check if the card was liked by the current user
  const isLiked = card.likes.some((cardId) => cardId === currentUser._id);

  const postcardLikeButtonClassName = `postcard__like-button ${
    isLiked && "postcard__like-button_active"
  }`;

  const postcardRemoveButtonClassName = `postcard__remove-button ${
    isOwn ? "postcard__remove-button_visible" : "postcard__remove-button"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleCardDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="postcard" key={card._id}>
      <button
        className={postcardRemoveButtonClassName}
        aria-label="remove postcard"
        type="button"
        onClick={handleCardDeleteClick}
      />
      <img
        className="postcard__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="postcard__title-area">
        <h2 className="postcard__title">{card.name}</h2>
        <div className="postcard__like-container">
          <button
            className={postcardLikeButtonClassName}
            aria-label="like-or-unlike-postcard"
            type="button"
            onClick={handleLikeClick}
          />
          <span className="postcard__like-counter">{likesCounter}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
