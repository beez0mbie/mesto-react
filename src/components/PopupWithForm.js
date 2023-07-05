import React, { useEffect, useRef } from 'react';

const PopupWithForm = ({ title, name, children, isOpen, onClose, buttonText, onSubmit }) => {
  const popup = useRef();
  useEffect(() => {
    popup.current.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        onClose();
      }
    });
  }, [onClose]);
  return (
    <div
      className={`popup ${isOpen ? 'popup_opened' : ''}`}
      id={`popup-${name}`}
      ref={popup}>
      <div className="popup__container">
        <button
          aria-label="Закрыть попап"
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <form
          action="./"
          name={name}
          className="popup-form"
          onSubmit={onSubmit}>
          <fieldset className="popup-form__fieldset">
            <h2 className="popup-form__title">{title}</h2>
            {children}
            <button
              type="submit"
              aria-label={buttonText}
              className="popup-form__button">
              {buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
