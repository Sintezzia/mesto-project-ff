import { initialCards } from './components/cards.js';
import {  createCard, delCard, cardLike } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import '../pages/index.css';

// импорт аватара для элемента с классом 'profile__image'.
import avatar from '../images/avatar.jpg';
const element = document.querySelector('.profile__image');
element.style.backgroundImage = `url(${avatar})`;

// Тэмплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const placesList = document.querySelector('.places__list');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const formNewPlace = document.forms['new-place'];
const cardNameInput = formNewPlace.elements['place-name'];
const cardLinkInput = formNewPlace.elements['link'];
const formEditProfile = document.forms['edit-profile'];
let profileNameInput = formEditProfile.elements['name'];
let profileJobInput = formEditProfile.elements['description'];
const nameOutputElement = document.querySelector('.profile__title');
const jobOutputElement = document.querySelector('.profile__description');

// Функция открытия изображения
function openImage(src, caption) {
  const imagePopup = document.querySelector('.popup_type_image');
  const imageElement = imagePopup.querySelector('.popup__image');
  const captionElement = imagePopup.querySelector('.popup__caption');

  imageElement.src = src;
  imageElement.alt = caption;
  captionElement.textContent = caption;

  openModal(popupTypeImage);
}

// функция добавления карточки и вывода ее на страницу
function addCard(name, link) {
  placesList.prepend(createCard(name, link, delCard, cardLike, openImage));
  closeModal(popupTypeNewCard);
}

// функция редактирования профиля
function editProfileSubmit(evt) {
  evt.preventDefault();

  const nameValue = profileNameInput.value;
  const jobValue = profileJobInput.value;

  nameOutputElement.textContent = nameValue;
  jobOutputElement.textContent = jobValue;

  formEditProfile.reset();
  closeModal(popupTypeEdit);
}

// функция создания слушателей событий
function setupEventListeners() {
  editProfileButton.addEventListener('click', () => {
    openModal(popupTypeEdit);
    profileNameInput.value = nameOutputElement.textContent;
    profileJobInput.value = jobOutputElement.textContent;
  });
  addCardButton.addEventListener('click', () => openModal(popupTypeNewCard));
  formNewPlace.addEventListener('submit', addCardSubmit);
  formEditProfile.addEventListener('submit', editProfileSubmit);
}

// функция обработки отправки формы добавления карточки
function addCardSubmit(evt) {
  evt.preventDefault();
  const cardNameValue = cardNameInput.value;
  const cardLinkValue = cardLinkInput.value;

  addCard(cardNameValue, cardLinkValue);
  formNewPlace.reset();
  closeModal(popupTypeNewCard);
}

// Инициализация
setupEventListeners();

// Вывести карточки на страницу
initialCards.forEach(function (item) {
  placesList.append(createCard(item.name, item.link, delCard, cardLike, openImage));
});

export { cardTemplate };