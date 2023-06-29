import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { api } from '../utils';
import { CurrentUserContext, CardsContext } from '../contexts';
import { hasMyLike } from '../utils';

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

  const handleUpdateAvatar = (currentUser) => {
    api
      .updateAvatar(currentUser.avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.error(`Error api.updateAvatar():\n ${err}`));
  };

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = hasMyLike(card, currentUser);

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

  const handleAddPlace = (card) => {
    api
      .addCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(`Error api.addCard():\n ${err}`));
  };

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
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCard}
          />
          <Footer />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}></EditAvatarPopup>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}></EditProfilePopup>
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}></AddPlacePopup>
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
