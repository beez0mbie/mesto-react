import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const inputAvatar = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputAvatar.current.value,
    });
    inputAvatar.current.value = '';
  };
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Обновить аватар"
      name="avatar-form"
      buttonText="Сохранить"
      onSubmit={handleSubmit}>
      <>
        <label className="popup-form__field">
          <input
            type="url"
            name="popup-input-link-avatar"
            id="popup-input-link-avatar"
            placeholder="Ссылка на картинку"
            className="popup-form__input"
            ref={inputAvatar}
            required
          />
          <span className="popup-form__input-error popup-input-link-avatar-error"></span>
        </label>
      </>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
