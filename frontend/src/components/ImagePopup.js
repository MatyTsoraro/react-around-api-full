import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_image-ex ${
        props.isOpen ? "popup_receptive" : ""
      }`}
    >
      <div className="popup__overlay popup__overlay_type_image-exhibit">
        <button
          className="popup__close-button popup__close-button_type_image-ex"
          type="button"
          onClick={props.onClose}
        />
        <img
          className="popup__image"
          src={props.card.link}
          alt={props.card.name}
        />
        <p className="popup__caption">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
