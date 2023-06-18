import React from 'react';

const PopupImage = ({ card, onClose }) => {
  return (
    <div
      className={`popup popup_overlay_dark ${card ? 'popup_opened' : ''}`}
      id="popup-image">
      <div className="popup__container">
        <button
          className="popup__close-button"
          onClick={onClose}></button>
        <figure className="popup-img">
          <img
            src={card && card.link}
            alt={card && card.name}
            className="popup-img__image"
          />
          <figcaption className="popup-img__figcaption">{card && card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
};

export default PopupImage;
