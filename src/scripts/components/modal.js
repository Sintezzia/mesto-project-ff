import {clearValidation} from "./validation";
import {validationConfig} from "../index";

// Функция для открытия модального окна
export const openModal = (modal) => {
  modal.classList.add('popup_is-opened');
  const errorPopup = modal.classList.contains('popup_type_error');
  const confirmPopup = modal.classList.contains('popup_type_delete');
  const isErrorPopup = errorPopup || confirmPopup;

  const buttonElement = modal.querySelector('.popup__button');
  if (buttonElement && !isErrorPopup) {
    buttonElement.disabled = true;
  }
  // Сохранение ссылок на обработчики событий
  const handleClosePopupClick = createClosePopupHandler(modal);
  const handleEscKeyPress = createEscKeyPressHandler(modal);
  const handleOverlayClick = createOverlayClickHandler(modal);

  modal.addEventListener('click', handleOverlayClick);
  document.addEventListener('keydown', handleEscKeyPress);
  modal.querySelector('.popup__close').addEventListener('click', handleClosePopupClick);

  // Сохранение обработчиков для последующего удаления
  modal.closeEventListeners = { handleClosePopupClick, handleEscKeyPress, handleOverlayClick };
}

// Функция для закрытия модального окна
export const closeModal = (modal) => {
  // Удаление обработчиков событий
  const { handleClosePopupClick, handleEscKeyPress, handleOverlayClick } = modal.closeEventListeners;
  modal.removeEventListener('click', handleOverlayClick);
  document.removeEventListener('keydown', handleEscKeyPress);
  modal.querySelector('.popup__close').removeEventListener('click', handleClosePopupClick);

  modal.classList.remove('popup_is-opened');

  const formElement = modal.querySelector('.popup__form');
  if (formElement) {
    setTimeout(() => {
      formElement.reset();
      clearValidation(formElement, validationConfig);
    }, 300);
  }
}

// Функции создания обработчиков
const createClosePopupHandler = (modal) => {
  return function() {
    closeModal(modal);
  }
}

const createEscKeyPressHandler = (modal) => {
  return function(evt) {
    if (evt.key === 'Escape') {
      closeModal(modal);
    }
  }
}

const createOverlayClickHandler = (modal) => {
  return function(evt) {
    if (evt.target === modal) {
      closeModal(modal);
    }
  }
}