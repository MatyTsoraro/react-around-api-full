import React, { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isNameValids, setIsNameValids] = useState(true);
  const [isDescriptionValids, setIsDescriptionValids] = useState(true);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState("");

  useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
    setIsNameValids(true);
    setIsDescriptionValids(true);
    setNameErrorMessage("");
    setDescriptionErrorMessage("");
  }, [currentUser, isOpen]);

  const handleUserNameChange = (evt) => {
    const { value, validity, validationMessage } = evt.target;
    setName(value);
    setIsNameValids(validity.valid);
    if (!validity.valid) {
      setNameErrorMessage(validationMessage);
    }
  };

  const handleUserJobChange = (evt) => {
    const { value, validity, validationMessage } = evt.target;
    setDescription(value);
    setIsDescriptionValids(validity.valid);
    if (!validity.valid) {
      setDescriptionErrorMessage(validationMessage);
    }
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Edit Profile"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Saving..." : "Save"}
    >
      <fieldset className="form__fieldset">
        <input
          className={`form__input ${!isNameValids && `form__input_type_error`}`}
          value={name}
          onChange={handleUserNameChange}
          type="text"
          name="username"
          id="input-name"
          placeholder="Name"
          minLength="2"
          maxLength="40"
          required
        />

        <span
          className={`form__input-error ${
            !isNameValids && `form__input-error_visible`
          }`}
          id="input-name-error"
        >
          {nameErrorMessage}
        </span>

        <input
          className={`form__input ${
            !isDescriptionValids && `form__input_type_error`
          }`}
          value={description}
          onChange={handleUserJobChange}
          type="text"
          name="userjob"
          placeholder="About Me"
          id="input-about"
          minLength="2"
          maxLength="200"
          required
        />

        <span
          className={`form__input-error ${
            !isDescriptionValids && `form__input-error_visible`
          }`}
          id="input-about-error"
        >
          {descriptionErrorMessage}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
