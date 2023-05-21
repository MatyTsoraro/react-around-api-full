import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [cardsName, setCardsName] = useState("");
  const [cardsImageLink, setCardsImageLink] = useState("");
  const [isCardsNameValid, setIsCardsNameValid] = useState(true);
  const [isCardsImageLinkValid, setIsCardsImageLinkValid] = useState(true);
  const [cardsNameErrorMessage, setCardsNameErrorMessage] = useState("");
  const [cardsImageLinkErrorMessage, setCardsImageLinkErrorMessage] =
    useState("");

  useEffect(() => {
    setCardsName("");
    setCardsImageLink("");
    setIsCardsNameValid(true);
    setIsCardsImageLinkValid(true);
    setCardsNameErrorMessage("");
    setCardsImageLinkErrorMessage("");
  }, [isOpen]);

  const handleTitleChange = (evt) => {
    const { value, validity, validationMessage } = evt.target;
    setCardsName(value);
    setIsCardsNameValid(validity.valid);
    if (!validity.valid) {
      setCardsNameErrorMessage(validationMessage);
    }
  };

  const handleImageLinkChange = (evt) => {
    const { value, validity, validationMessage } = evt.target;
    setCardsImageLink(value);
    setIsCardsImageLinkValid(validity.valid);
    if (!validity.valid) {
      setCardsImageLinkErrorMessage(validationMessage);
    }
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ name: cardsName, link: cardsImageLink });
  }

  return (
    <PopupWithForm
      title="New Place"
      name="add-place"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Creating..." : "Create"}
    >
      <fieldset className="form__fieldset">
        <input
          className={`form__input ${
            !isCardsNameValid && `form__input_type_error`
          }`}
          type="text"
          name="name"
          id="input-title"
          placeholder="Title"
          minLength="1"
          maxLength="30"
          onChange={handleTitleChange}
          value={cardsName}
          required
        />

        <span
          className={`form__input-error ${
            !isCardsNameValid && `form__input-error_visible`
          }`}
          id="input-title-error"
        >
          {cardsNameErrorMessage}
        </span>

        <input
          className={`form__input ${
            !isCardsImageLinkValid && `form__input_type_error`
          }`}
          type="url"
          name="link"
          id="input-url"
          placeholder="Image Link"
          onChange={handleImageLinkChange}
          value={cardsImageLink}
          required
        />

        <span
          className={`form__input-error ${
            !isCardsImageLinkValid && `form__input-error_visible`
          }`}
          id="input-url-error"
        >
          {cardsImageLinkErrorMessage}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
