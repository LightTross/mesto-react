import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  //открываем попап обновления аватара
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  //открываем попап редактирования профиля
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  //открываем попап добавления карточки
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  //закрываем все попапы
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  };

  //закрываем форму по клавише Escape
  const handleEscClose = event => {
    if (event.key === 'Escape') {
      closeAllPopups();
    }
  };
  
  //закрываем форму по нажатию клавиши мыши
  const handleCloseByClick = event => {
    if (event.target === event.currentTarget || event.target.classList.contains('popup_opened')) {
      closeAllPopups();
    };
  }

  //открываем картинку выбранной карточки 
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  //навешиваем / убираем обработчики закрытия
  React.useEffect(() => {
    if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || selectedCard) {
      document.addEventListener('keydown', handleEscClose);
      document.addEventListener('mousedown', handleCloseByClick);
    }
    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('mousedown', handleCloseByClick);
    };
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen]);
      
  return (
    <div className="page">
      <Header />
      <Main 
        onEditAvatar={handleEditAvatarClick} 
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm 
        title="Обновить аватар" 
        name="update-avatar" 
        buttonText="Сохранить" 
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>
        <input
          id="avatar-link-input"
          type="url"
          className="form__input form__input_avatar-link"
          name="avatarLink"
          placeholder="Ссылка на картинку"
          required=""
        />
        <span className="form__input-error avatar-link-input-error" />
      </PopupWithForm>

      <PopupWithForm 
        title="Редактировать профиль" 
        name="profile" 
        buttonText="Сохранить" 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups}>
        <input
          id="username-input"
          type="text"
          className="form__input form__input_info_name"
          name="username"
          placeholder="Имя"
          minLength={2}
          maxLength={40}
          required=""
        />
        <span className="form__input-error username-input-error" />
        <input
          id="about-input"
          type="text"
          className="form__input form__input_info_about"
          name="about"
          placeholder="О себе"
          minLength={2}
          maxLength={200}
          required=""
        />
        <span className="form__input-error about-input-error" />
      </PopupWithForm>

      <PopupWithForm 
        title="Новое место" 
        name="item" 
        buttonText="Создать" 
        isOpen={isAddPlacePopupOpen} 
        onClose={closeAllPopups}>
        <input
          id="title-input"
          type="text"
          className="form__input form__input_title"
          name="title"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required=""
        />
        <span className="form__input-error title-input-error" />
        <input
          id="link-input"
          type="url"
          className="form__input form__input_link"
          name="link"
          placeholder="Ссылка на картинку"
          required=""
        />
        <span className="form__input-error link-input-error" />
      </PopupWithForm>

      <PopupWithForm 
        title="Вы уверены?" 
        name="delete-item" 
        buttonText="Да"></PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;