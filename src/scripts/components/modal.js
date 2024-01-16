import { formEditProfile } from '../index.js';

// Создание функций обработчиков с помощью замыканий
function createClosePopupHandler(popupSelector) {
  return function() {
    closeModal(popupSelector);
  }
}

function createEscKeyPressHandler(popupSelector) {
  return function(evt) {
    if (evt.key === 'Escape') {
      closeModal(popupSelector);
    }
  }
}

function createOverlayClickHandler(popupSelector) {
  return function(evt) {
    const modal = document.querySelector(popupSelector);
    if (evt.target === modal) {
      closeModal(popupSelector);
    }
  }
}

// Функция для открытия модального окна
function openModal(popupSelector) {
  const modal = document.querySelector(popupSelector);
  modal.classList.add('popup_is-opened');

  // Сохранение ссылок на обработчики событий
  const handleClosePopupClick = createClosePopupHandler(popupSelector);
  const handleEscKeyPress = createEscKeyPressHandler(popupSelector);
  const handleOverlayClick = createOverlayClickHandler(popupSelector);

  modal.addEventListener('click', handleOverlayClick);
  document.addEventListener('keydown', handleEscKeyPress);
  modal.querySelector('.popup__close').addEventListener('click', handleClosePopupClick);

  // Сохранение обработчиков для последующего удаления
  modal.closeEventListeners = { handleClosePopupClick, handleEscKeyPress, handleOverlayClick };
}

// Функция для закрытия модального окна
function closeModal(popupSelector) {
  const modal = document.querySelector(popupSelector);
  const form = modal.querySelector('.popup__form');

  if (form) {
    form.reset();
  }

  // Удаление обработчиков событий
  const { handleClosePopupClick, handleEscKeyPress, handleOverlayClick } = modal.closeEventListeners;
  modal.removeEventListener('click', handleOverlayClick);
  document.removeEventListener('keydown', handleEscKeyPress);
  modal.querySelector('.popup__close').removeEventListener('click', handleClosePopupClick);

  modal.classList.remove('popup_is-opened');
}

export { openModal, closeModal };
