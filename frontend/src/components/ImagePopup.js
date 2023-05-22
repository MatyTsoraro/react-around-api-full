import React from "react";

const ImagePopup = (props) => {
  return (
    <div className={`popup-prev popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__preview-container">
        <button
          className="popup__close-button"
          onClick={props.onClose}
          type="button"
        />
        <img
          src={props.card.link}
          alt={props.card.name}
          className="popup__image"
        />
        <p className="popup__caption">{props.card.name}</p>
      </div>
    </div>
  );
};

export default ImagePopup;
