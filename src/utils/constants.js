//ПЕРЕМЕННЫЕ ----------------------------------------------------------
const elementsList = document.querySelector('.elements__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAvatarEditButton = document.querySelector('.profile__update-avatar-button');
const profileName = document.querySelector('.profile__name');
const inputName = document.querySelector('.form__input_info_name');
const profileAbout = document.querySelector('.profile__about');
const profileAvatar = document.querySelector('.profile__avatar');
const inputAbout = document.querySelector('.form__input_info_about');
const inputAvatar = document.querySelector('.form__input_avatar-link');
const itemAddButton = document.querySelector('.profile__add-button');

const formValidators = {};

export {
  elementsList,
  profileEditButton,
  profileAvatarEditButton,
  profileName,
  inputName,
  profileAbout,
  profileAvatar,
  inputAbout,
  inputAvatar,
  itemAddButton,
  formValidators
};