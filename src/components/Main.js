import React from 'react';
import { api } from '../utils/Api';
import Card from './Card';
import { CurrentUserContext, CardsContext } from '../contexts';
import { hasMyLike } from '../utils';

const Main = ({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, setCards }) => {
  const userInfo = React.useContext(CurrentUserContext);
  const cards = React.useContext(CardsContext);

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = hasMyLike(card, userInfo);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        // проходимся по текущему стейту карточек находим карточку с нужным айди и возвращаем массив с замененной карточкой newCard
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.error(`Error api.changeLikeCardStatus():\n ${err}`));
  };

  const handleDeleteCard = (card) => {
    api
      .deleteCard(card._id)
      .then(() => setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch((err) => console.error(`Error api.deleteCard():\n ${err}`));
  };

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
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCard}
          />
        ))}
      </section>
    </main>
  );
};

export default Main;
