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
const formNewPlace = document.forms['new-place'];
const cardNameInput = formNewPlace.elements['place-name'];
const cardLinkInput = formNewPlace.elements['link'];
const formEditProfile = document.forms['edit-profile'];
const profileNameInput = formEditProfile.elements['name'];
const profileJobInput = formEditProfile.elements['description'];

// Функция открытия изображения
function openImage(src, caption) {
  const imagePopup = document.querySelector('.popup_type_image');
  const imageElement = imagePopup.querySelector('.popup__image');
  const captionElement = imagePopup.querySelector('.popup__caption');

  imageElement.src = src;
  imageElement.alt = caption;
  captionElement.textContent = caption;

  openModal('.popup_type_image');
}

// функция добавления карточки и вывода ее на страницу
function addCard(name, link) {
  const newCard = { name: name, link: link };
  initialCards.unshift(newCard);
  placesList.prepend(createCard(name, link, delCard, cardLike, openImage));
  closeModal('.popup_type_new-card');
}

// функция редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault(); 
  const nameValue = profileNameInput.value;
  const jobValue = profileJobInput.value;
  const nameOutputElement = document.querySelector('.profile__title');
  const jobOutputElement = document.querySelector('.profile__description');

  nameOutputElement.textContent = nameValue;
  jobOutputElement.textContent = jobValue;

  formEditProfile.reset()

  closeModal('.popup_type_edit');
}

// функция создания слушателей событий
function setupEventListeners() {
  editProfileButton.addEventListener('click', () => openModal('.popup_type_edit'));
  addCardButton.addEventListener('click', () => openModal('.popup_type_new-card'));
  formNewPlace.addEventListener('submit', handleAddCardSubmit);
  formEditProfile.addEventListener('submit', handleFormSubmit);
}

// функция обработки отправки формы добавления карточки
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const cardNameValue = cardNameInput.value;
  const cardLinkValue = cardLinkInput.value;

  addCard(cardNameValue, cardLinkValue);
  formNewPlace.reset();
  closeModal('.popup_type_new-card');
}

// Инициализация
setupEventListeners();

// Вывести карточки на страницу
initialCards.forEach(function (item) {
  placesList.append(createCard(item.name, item.link, delCard, cardLike, openImage));
});

export { cardTemplate };