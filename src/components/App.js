import Footer from './Footer';
import Header from './Header';
import Main from './Main';

function App() {
  const handleEditAvatarClick = () => {
    const popup = document.querySelector('#popup-avatar-form');
    popup.classList.add('popup_opened');
  };

  const handleEditProfileClick = () => {
    const popup = document.querySelector('#popup-profile-form');
    popup.classList.add('popup_opened');
  };

  const handleAddPlaceClick = () => {
    const popup = document.querySelector('#popup-card-form');
    popup.classList.add('popup_opened');
  };

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
      />
      <Footer />
    </div>
  );
}

export default App;
