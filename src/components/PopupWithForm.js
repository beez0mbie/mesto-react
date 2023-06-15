import React from 'react';
// id="popup-avatar"
// name="avatar-form"

// id = 'popup-change-profile';
// name = 'profile-form';

// id="popup-add-card">
// name="card-form"

// id="popup-delete">
// name="delete-form"

const PopupWithForm = ({ title, name, children }) => {
  return (
    <div
      className="popup"
      id={`popup-${name}`}>
      <div className="popup__container">
        <button
          aria-label="Закрыть попап"
          type="button"
          className="popup__close-button"></button>
        <form
          action="./"
          name={name}
          className="popup-form"
          noValidate>
          <fieldset className="popup-form__fieldset">
            <h2 className="popup-form__title">{title}</h2>
            {children}
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
