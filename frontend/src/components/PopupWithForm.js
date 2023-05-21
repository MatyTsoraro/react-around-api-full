import React, { useEffect, useRef, useState } from "react";

function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  children,
  buttonText,
  onSubmit,
  isTooltipOpen,
}) {
  const formRef = useRef();
  const [isFormValids, setIsFormValids] = useState(false);

  useEffect(() => {
    setIsFormValids(formRef.current.checkValidity());
  }, [isOpen, formRef]);

  function handleFormChange() {
    setIsFormValids(formRef.current.checkValidity());
  }

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_receptive" : ""}`}
    >
      <div className={`popup__overlay popup__overlay_type_${name}`}>
        <button
          className={`popup__close-button popup__close-button_type_${name}`}
          type="button"
          aria-label="close-delete-modal"
          onClick={onClose}
        />

        <h2 className={`popup__title popup__title_type_${name}`}>{title}</h2>
        <form
          action="#"
          className="form popup__form"
          onSubmit={onSubmit}
          onChange={handleFormChange}
          name={name}
          ref={formRef}
          noValidate
        >
          {children}

          {!isTooltipOpen && (
            <fieldset className="form__fieldset">
              <button
                className={`form__button ${
                  !isFormValids && `form__button_disabled`
                } form__button_type_${name}`}
                type="submit"
              >
                {buttonText}
              </button>
            </fieldset>
          )}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
