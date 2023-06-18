import React from 'react';

const Card = ({ card, onCardClick }) => {
  return (
    <div className="card">
      <button
        aria-label="Удалить"
        type="button"
        className="card__trash"></button>
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
            className="card__heart"></button>
          <p className="card__heart-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
