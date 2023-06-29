import React from 'react';
// id="popup-avatar"
// name="avatar-form"

// id = 'popup-change-profile';
// name = 'profile-form';

// id="popup-add-card">
// name="card-form"

// id="popup-delete">
// name="delete-form"

const PopupWithForm = ({ title, name, children, isOpen, onClose, buttonText, onSubmit }) => {
  return (
    <div
      className={`popup ${isOpen ? 'popup_opened' : ''}`}
      id={`popup-${name}`}>
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
