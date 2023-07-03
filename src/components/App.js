import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import DeleteCardPopup from './DeleteCardPopup';
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
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [cardIdToDelete, setCardIdToDelete] = useState(null);
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

  const handleClosePopupByEsc = (event) => {
    if (event.key === 'Escape') {
      closeAllPopups();
    }
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
    document.addEventListener('keydown', handleClosePopupByEsc);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
    document.addEventListener('keydown', handleClosePopupByEsc);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
    document.addEventListener('keydown', handleClosePopupByEsc);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    document.addEventListener('keydown', handleClosePopupByEsc);
  };

  const handleCardTrashClick = (card) => {
    setIsDeletePopupOpen(true);
    setCardIdToDelete(card._id);
    document.addEventListener('keydown', handleClosePopupByEsc);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
    setCardIdToDelete(null);
    document.removeEventListener('keydown', handleClosePopupByEsc);
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
    const isLiked = hasMyLike(card, currentUser);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        // проходимся по текущему стейту карточек находим карточку с нужным айди и возвращаем массив с замененной карточкой newCard
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.error(`Error api.changeLikeCardStatus():\n ${err}`));
  };

  const handleDeleteCard = (cardId) => {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));
        closeAllPopups();
      })
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
            onCardTrashClick={handleCardTrashClick}
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
          <DeleteCardPopup
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            cardId={cardIdToDelete}
            onDeleteCard={handleDeleteCard}
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
