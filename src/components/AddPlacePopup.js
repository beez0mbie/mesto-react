import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, buttonText }) => {
  const [place, setPlace] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setPlace('');
      setLink('');
    }
  }, [isOpen]);

  const handleChangePlace = (e) => {
    setPlace(e.target.value);
  };

  const handleChangeLink = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name: place,
      link,
    });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Новое Место"
      name="card-form"
      buttonText={buttonText}
      onSubmit={handleSubmit}>
      <>
        <label className="popup-form__field">
          <input
            type="text"
            name="popup-input-place"
            id="popup-input-place"
            placeholder="Название"
            className="popup-form__input"
            minLength="2"
            maxLength="30"
            value={place}
            onChange={handleChangePlace}
            required
          />
          <span className="popup-form__input-error popup-input-place-error"></span>
        </label>
        <label className="popup-form__field">
          <input
            type="url"
            name="popup-input-link"
            id="popup-input-link"
            placeholder="Ссылка на картинку"
            className="popup-form__input"
            value={link}
            onChange={handleChangeLink}
            required
          />
          <span className="popup-form__input-error popup-input-link-error"></span>
        </label>
      </>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
