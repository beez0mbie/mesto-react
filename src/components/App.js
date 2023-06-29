import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import { api } from '../utils';
import { CurrentUserContext, CardsContext } from '../contexts';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: '',
    cohort: '',
    _id: '',
  });
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getAppInfo()
      .then((res) => {
        const [userInfo, cards] = res;
        setCurrentUser({ ...userInfo });
        setCards(cards);
      })
      .catch((err) => console.error(`Error api.getAppInfo():\n ${err}`));
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleUpdateUser = (currentUser) => {
    api
      .updateUserInfo(currentUser.name, currentUser.about)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.error(`Error api.updateUserInfo():\n ${err}`));
  };

  console.log(cards);
  console.log(currentUser);

  return (
    <CardsContext.Provider value={cards}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            setCards={setCards}
          />
          <Footer />
          <PopupWithForm
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            title="Обновить аватар"
            name="avatar-form"
            buttonText="Сохранить">
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
            </>
          </PopupWithForm>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}></EditProfilePopup>
          <PopupWithForm
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            title="Новое Место"
            name="card-form"
            buttonText="Создать">
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
            </>
          </PopupWithForm>
          <PopupWithForm
            title="Вы уверены?"
            name="delete-form"
            onClose={closeAllPopups}
            buttonText="Да"
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
        </div>
      </CurrentUserContext.Provider>
    </CardsContext.Provider>
  );
}

export default App;
