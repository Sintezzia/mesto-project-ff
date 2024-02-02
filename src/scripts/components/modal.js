// Функция для открытия модального окна
export const openModal = (modal) => {
  modal.classList.add('popup_is-opened');

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
  modal.classList.remove('popup_is-opened');

  // Удаление обработчиков событий
  const { handleClosePopupClick, handleEscKeyPress, handleOverlayClick } = modal.closeEventListeners;
  modal.removeEventListener('click', handleOverlayClick);
  document.removeEventListener('keydown', handleEscKeyPress);
  modal.querySelector('.popup__close').removeEventListener('click', handleClosePopupClick);
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