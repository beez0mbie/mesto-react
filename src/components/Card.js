import React from 'react';
import { CurrentUserContext } from '../contexts';

const Card = ({ card, onCardClick }) => {
  const userInfo = React.useContext(CurrentUserContext);

  const isMyCard = userInfo._id === card.owner._id;
  const isMyLike = card.likes.some((like) => like._id === userInfo._id);

  return (
    <div className="card">
      {isMyCard && (
        <button
          aria-label="Удалить"
          type="button"
          className="card__trash"></button>
      )}
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={() => onCardClick(card)}
      />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__heart-container">
          <button
            aria-label="Лайк"
            type="button"
            className={`card__heart ${isMyLike && 'card__heart_active'}`}></button>
          <p className="card__heart-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
