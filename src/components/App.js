import {useState, useEffect} from "react";

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithConfirmation from './PopupWithConfirmation';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cardToDelete, setCardToDelete] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  

  //получаем данные пользователя и карточки с сервера
  useEffect(() => {
    Promise.all([api.getInitialItems(), api.getUserInfo()])
      .then(([initialItems, userData]) => {
        setCurrentUser(userData);
        setCards(initialItems);
      })
      .catch(error => console.log(`Ошибка: ${error}`));
  }, [])

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
    setIsConfirmationPopupOpen(false);
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
  };

  //открываем картинку выбранной карточки 
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  //проставляем лайк
  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards(state => 
          state.map(c => c._id === card._id ? newCard : c));
      })
      .catch(error => console.log(`Ошибка: ${error}`));
  };

  //удаляем карточку
  const handleCardDelete = (card)  => {
    setIsLoading(true);

    api.deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter(c => c._id !== card._id));
        closeAllPopups();
      })
      .catch(error => console.log(`Ошибка: ${error}`))
      .finally(() => {setIsLoading(false)});
  };

  //обработчик кнопки удаления карточки
  const handleCardDeleteClick = (card) => {
    setIsConfirmationPopupOpen(!isConfirmationPopupOpen);
    setCardToDelete(card);
  }

  //редактируем данные пользователя
  const handleUpdateUser = (user) => {
    setIsLoading(true);

    api.editProfile(user)
      .then(userInfo => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(error => console.log(`Ошибка: ${error}`))
      .finally(() => {setIsLoading(false)});
  };

  //редактируем аватар
  const handleUpdateAvatar = (user) => {
    setIsLoading(true);
    
    api.updateAvatar(user)
      .then(userInfo => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(error => console.log(`Ошибка: ${error}`))
      .finally(() => {setIsLoading(false)});
  };

  //добавляем новую карточку
  const handleAddPlaceSubmit = (newCard) => {
    setIsLoading(true);
    
    api.addNewItem(newCard)
      .then(card => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch(error => console.log(`Ошибка: ${error}`))
      .finally(() => {setIsLoading(false)});
  }

  //навешиваем / убираем обработчики закрытия
  useEffect(() => {
    if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isConfirmationPopupOpen || selectedCard) {
      document.addEventListener('keydown', handleEscClose);
      document.addEventListener('mousedown', handleCloseByClick);
    }
    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('mousedown', handleCloseByClick);
    };
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isConfirmationPopupOpen, selectedCard]);
      
  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <div className="page">
        <Header />
        <Main 
          onEditAvatar={handleEditAvatarClick} 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete ={handleCardDelete}
          onCardDeleteClick={handleCardDeleteClick}
          cards = {cards}
        />
        <Footer />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={isLoading}
        />
        <PopupWithConfirmation
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          card={cardToDelete}
          onLoading={isLoading}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider> 
  );
}

export default App;