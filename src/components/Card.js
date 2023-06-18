import React from 'react';

const Card = ({ card }) => {
  return (
    <div className="card">
      <button
        aria-label="Удалить"
        type="button"
        className="card__trash"></button>
      <img
        src={card.link}
        alt="template"
        className="card__image"
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