import {useState, useEffect} from "react";

import addButtonImg from '../images/add-button.svg';
import profileUpdateAvatarButton from '../images/update-avatar-button.svg';
import api from '../utils/Api';
import Card from "./Card";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick
}) {
  const [userData, setUserData] = useState({});
  const [cards, setCards] = useState([]);

  //получаем данные пользователя и карточки с сервера
  useEffect(() => {
    Promise.all([api.getInitialItems(), api.getUserInfo()])
      .then(([initialItems, userData]) => {
        setUserData(userData);
        setCards(initialItems);
      })
      .catch(error => console.log(`Ошибка: ${error}`));
  }, [])

  const userName = userData.name;
  const userDescription = userData.about;
  const userAvatar = userData.avatar;


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={userAvatar}
            alt="Аватар"
          />
          <img
            onClick={onEditAvatar}
            className="profile__update-avatar-button"
            src={profileUpdateAvatarButton}
            alt="edit-profile"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button
            onClick={onEditProfile}
            type="button"
            aria-label="Редактировать профиль"
            className="profile__edit-button"
          />
          <p className="profile__about">{userDescription}</p>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          aria-label="Добавить фотографии"
          className="profile__add-button"
        >
          <img
            src={addButtonImg}
            alt="Кнопка «добавить»"
            className="profile__add-button-img"
          />
        </button>
      </section>
      <section className="elements">
        <ul className="elements__list">
        {cards.map(card => {
          return (
            <Card
              key = {card._id}
              card = {card}
              onCardClick = {onCardClick}
            />
          );
        })}
        </ul>
      </section>
    </main>
  );
}

export default Main;