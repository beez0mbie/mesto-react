import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import Card from './Card';

const Main = ({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onClose,
  isEditAvatarPopupOpen,
  isEditProfilePopupOpen,
  isAddPlacePopupOpen,
  onCardClick,
  card,
}) => {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCadrs] = useState([]);

  useEffect(() => {
    api
      .getAppInfo()
      .then((res) => {
        const [userInfo, cards] = res;
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
        setCadrs(cards.reverse());
      })
      .catch((err) => console.error(`Error api.getUserInfo():\n ${err}`));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <figure
          className="profile__logo-container"
          onClick={onEditAvatar}>
          <img
            src={userAvatar}
            alt="Аватар"
            className="profile__logo"
          />
        </figure>
        <div className="profile__info">
          <div className="profile__title-container">
            <h1 className="profile__title">{userName}</h1>
            <button
              aria-label="Редактировать профиль"
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button
          aria-label="Добавить карточку"
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}></button>
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
          />
        ))}
      </section>
      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={onClose}
        title="Обновить аватар"
        name="avatar-form"
        children={
          <>
            <label className="popup-form__field">
              <input
                type="url"
                name="popup-input-link-avatar"
                id="popup-input-link-avatar"
                placeholder="Ссылка на картинку"
                className="popup-form__input"
                required
              />
              <span className="popup-form__input-error popup-input-link-avatar-error"></span>
            </label>
            <button
              type="submit"
              aria-label="Сохранить аватар"
              className="popup-form__button">
              Сохранить
            </button>
          </>
        }
      />
      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        onClose={onClose}
        title="Редактировать профиль"
        name="profile-form"
        children={
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
              />
              <span className="popup-form__input-error popup-input-job-error"></span>
            </label>
            <button
              type="submit"
              aria-label="Сохранить  изменения"
              className="popup-form__button">
              Сохранить
            </button>
          </>
        }
      />
      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        onClose={onClose}
        title="Новое Место"
        name="card-form"
        children={
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
                required
              />
              <span className="popup-form__input-error popup-input-link-error"></span>
            </label>
            <button
              type="submit"
              aria-label="Сохранить  изменения"
              className="popup-form__button">
              Создать
            </button>
          </>
        }
      />
      <PopupWithForm
        title="Вы уверены?"
        name="delete-form"
        onClose={onClose}
        children={
          <button
            type="submit"
            aria-label="Удалить карточку"
            className="popup-form__button">
            Да
          </button>
        }
      />
      <ImagePopup
        card={card}
        onClose={onClose}
      />
    </main>
  );
};

export default Main;
