import React from 'react';

import Card from './Card';
import { CurrentUserContext, CardsContext } from '../contexts';

const Main = ({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) => {
  const userInfo = React.useContext(CurrentUserContext);
  const cards = React.useContext(CardsContext);

  return (
    <main className="content">
      <section className="profile">
        <figure
          className="profile__logo-container"
          onClick={onEditAvatar}>
          <img
            src={userInfo.avatar}
            alt="Аватар"
            className="profile__logo"
          />
        </figure>
        <div className="profile__info">
          <div className="profile__title-container">
            <h1 className="profile__title">{userInfo.name}</h1>
            <button
              aria-label="Редактировать профиль"
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{userInfo.about}</p>
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
    </main>
  );
};

export default Main;
