import React from 'react';

const PopupImage = () => {
  return (
    <div
      className="popup popup_overlay_dark"
      id="popup-image">
      <div className="popup__container">
        <button className="popup__close-button"></button>
        <figure className="popup-img">
          <img
            src="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
            alt="Камчатка"
            className="popup-img__image"
          />
          <figcaption className="popup-img__figcaption"></figcaption>
        </figure>
      </div>
    </div>
  );
};

export default PopupImage;
