import React from "react";

const PopupWithForm = (props) => {
  return (
    <div
      className={`popup ${props.name} ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
        />
        <h2 className="popup__title">{props.title}</h2>
        <form
          action="submit"
          onSubmit={props.onSubmit}
          className="form popup__form"
          name={props.name}
        >
          {props.children}
          <fieldset className="form__fieldset">
            <button className="form__button" type="submit">
              {props.buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
