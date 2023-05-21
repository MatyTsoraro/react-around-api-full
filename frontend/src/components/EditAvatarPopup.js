import React, { useEffect, useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const [isAvatarLinkValid, setIsAvatarLinkValid] = useState(true);
  const [avatarLinkErrorMessage, setAvatarLinkErrorMessage] = useState("");
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
    setIsAvatarLinkValid(true);
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  function handleTestValidity(evt) {
    setIsAvatarLinkValid(evt.target.validity.valid);
    setAvatarLinkErrorMessage(avatarRef.current.validationMessage);
  }

  return (
    <PopupWithForm
      title="Update Profile Picture"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Saving..." : "Save"}
    >
      <fieldset className="form__fieldset">
        <input
          ref={avatarRef}
          className={`form__input ${
            !isAvatarLinkValid && `form__input_type_error`
          }`}
          type="url"
          name="link"
          id="input-avatar"
          placeholder="User Image Url"
          onChange={handleTestValidity}
          required
        />
        <span
          className={`form__input-error ${
            !isAvatarLinkValid && `form__input-error_visible`
          }`}
          id="input-avatar-error"
        >
          {avatarLinkErrorMessage}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
