import React from 'react';

const Main = () => {
  const handleEditAvatarClick = () => {
    const popup = document.querySelector('#popup-change-profile');
    popup.classList.add('popup_opened');
  };

  return (
    <main className="content">
      <section className="profile">
        <figure className="profile__logo-container">
          <img
            src="./images/Custo.jpg"
            alt="Аватар"
            className="profile__logo"
          />
        </figure>
        <div className="profile__info">
          <div className="profile__title-container">
            <h1 className="profile__title">Жак-Ив Кусто</h1>
            <button
              aria-label="Редактировать профиль"
              type="button"
              className="profile__edit-button"
              onClick={handleEditAvatarClick}></button>
          </div>
          <p className="profile__subtitle"></p>
        </div>
        <button
          aria-label="Добавить карточку"
          type="button"
          className="profile__add-button"></button>
      </section>
      <section className="cards"></section>
      <div
        className="popup"
        id="popup-change-profile">
        <div className="popup__container">
          <button
            aria-label="Закрыть попап"
            type="button"
            className="popup__close-button"></button>
          <form
            action="./"
            name="profile-form"
            className="popup-form"
            novalidate>
            <fieldset className="popup-form__fieldset">
              <h2 className="popup-form__title">Редактировать профиль</h2>
              <label className="popup-form__field">
                <input
                  type="text"
                  name="popup-input-name"
                  id="popup-input-name"
                  placeholder="Введите имя профиля"
                  className="popup-form__input"
                  required
                  minlength="2"
                  maxlength="40"
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
                  minlength="2"
                  maxlength="200"
                />
                <span className="popup-form__input-error popup-input-job-error"></span>
              </label>
              <button
                type="submit"
                aria-label="Сохранить  изменения"
                className="popup-form__button">
                Сохранить
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Main;
