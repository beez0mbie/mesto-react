import React, { useEffect, useRef } from 'react';

const ImagePopup = ({ card, onClose }) => {
  const popup = useRef();
  useEffect(() => {
    popup.current.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        onClose();
      }
    });
  }, [onClose]);
  return (
    <div
      className={`popup popup_overlay_dark ${card.name ? 'popup_opened' : ''}`}
      id="popup-image"
      ref={popup}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          onClick={onClose}></button>
        <figure className="popup-img">
          <img
            src={card.link && card.link}
            alt={card.name && card.name}
            className="popup-img__image"
          />
          <figcaption className="popup-img__figcaption">{card.name && card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
};

export default ImagePopup;
