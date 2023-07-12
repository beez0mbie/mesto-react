import React, { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, buttonText }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      name="profile-form"
      buttonText={buttonText}>
      <>
        <label className="popup-form__field">
          <input
            type="text"
            name="popup-input-name"
            id="popup-input-name"
            placeholder="Введите имя профиля"
            className="popup-form__input"
            required
            minLength="2"
            maxLength="40"
            value={name}
            onChange={handleChangeName}
          />
          <span className="popup-form__input-error popup-input-name-error"></span>
        </label>
        <label className="popup-form__field">
          <input
            type="text"
            name="popup-input-job"
            id="popup-input-job"
            placeholder="Введите название работы"
            className="popup-form__input"
            required
            minLength="2"
            maxLength="200"
            value={description}
            onChange={handleChangeDescription}
          />
          <span className="popup-form__input-error popup-input-job-error"></span>
        </label>
      </>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
