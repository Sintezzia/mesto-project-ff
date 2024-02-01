import { createCard, delCard, cardLike } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import '../pages/index.css';
import { enableValidation, clearValidation } from './components/validation.js';
import {
    getProfileRequest,
    createNewCardRequest,
    editProfileRequest,
    getInitialCardsRequest,
    setNewAvatarRequest,
    deleteCardRequest,
    cardLikeRequest
} from "./components/api";

// DOM узлы
export const placesList = document.querySelector('.places__list');
const profileAvatar = document.querySelector('.profile__image');
const editAvatarButton = document.querySelector('.avatar__edit-button');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupImageCaption = popupTypeImage.querySelector('.popup__caption');
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const popupTypeConfirmDelete = document.querySelector('.popup_type_delete');
const popupButtonConfirmDelete = popupTypeConfirmDelete.querySelector('.popup__button_confirm-delete')
const popupTypeError = document.querySelector('.popup_type_error');
const popupErrorButton = popupTypeError.querySelector('.popup__button');
const errorTextElement = popupTypeError.querySelector('.popup__error');
const popupErrorButtonSubmit = popupTypeError.querySelector('.popup__button');
const formNewAvatar = document.forms['new-avatar'];
const newAvatarInput = formNewAvatar.elements['link'];
const formNewPlace = document.forms['new-place'];
const cardNameInput = formNewPlace.elements['place-name'];
const cardLinkInput = formNewPlace.elements['link'];
const formEditProfile = document.forms['edit-profile'];
let profileNameInput = formEditProfile.elements['name'];
let profileJobInput = formEditProfile.elements['description'];
const nameOutputElement = document.querySelector('.profile__title');
const jobOutputElement = document.querySelector('.profile__description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const appState = {
    globalUserId: null,
};

// Функция открытия изображения
export const openImage = (src, name) => {
    popupImage.src = src;
    popupImage.alt = name;
    popupImageCaption.textContent = name;
    openModal(popupTypeImage);
};

// Функция для обработки удаления карточки
const handleDeleteCard = (cardId, cardElement) => {
    openModal(popupTypeConfirmDelete);
    popupButtonConfirmDelete.onclick = () => {
        deleteCardRequest(cardId)
            .then(() => {
                delCard(cardElement);
                closeModal(popupTypeConfirmDelete);
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

//  Функция для обработки лайка карточки
const handleLikeCard = (evt, cardId, likeButton) => {
    const method = likeButton.classList.contains('card__like-button_is-active') ? 'DELETE' : 'PUT';
    cardLikeRequest(cardId, method)
        .then((result) => {
            cardLike(evt, result.likes.length, likeButton);
        })
        .catch((err) => {
            console.error(err); // Здесь также можно добавить обработку ошибки
        });
};

// Функция проверки ссылки на действительность
const checkImageUrl = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => reject(new Error(`Не удалось загрузить изображение по URL: ${url}`));
        img.src = url;
    });
}

// Изменение текста кнопки в зависимости от состояния загрузки
const toggleLoadingButtonText = (button, isLoading = false) => {
    if (isLoading) {
        button.dataset.originalText = button.textContent;
        button.textContent = 'Сохранение...';
    } else {
        button.textContent = button.dataset.originalText || 'Сохранить';
    }
}

// Функция сабмита редактирования аватара
const editProfileAvatarSubmit = (evt) => {
    evt.preventDefault();
    toggleLoadingButtonText(evt.submitter, true);

    const newAvatarUrl = newAvatarInput.value;

    checkImageUrl(newAvatarUrl)
        .then(validUrl => {
            return setNewAvatarRequest(validUrl);
        })
        .then((res) => {
            profileAvatar.style.backgroundImage = `url(${res.avatar})`;
            closeModal(popupTypeAvatar);
        })
        .catch(err => {
            errorTextElement.textContent = `${err.message}`;
            openModal(popupTypeError);
            popupErrorButton.disabled = false;
        })
        .finally(() => {
            toggleLoadingButtonText(evt.submitter, false);
            setTimeOutInputReset(formNewAvatar);
            clearValidation(formNewAvatar, validationConfig);
        })
}
// Функция добавления карточки и вывода ее на страницу
const addCard = (name, link, likes, cardId, cardOwnerId, userId) => {
    const cardElement = createCard(name, link, likes, cardId, cardOwnerId, userId, handleDeleteCard, handleLikeCard, openImage);
    placesList.prepend(cardElement);
};


// Функция сабмита редактирования профиля
const editProfileSubmit = (evt) => {
    evt.preventDefault();
    toggleLoadingButtonText(evt.submitter, true);

  const nameValue = profileNameInput.value;
  const jobValue = profileJobInput.value;

  editProfileRequest(nameValue, jobValue)
      .then(userData => {
        console.log('Данные пользователя обновлены:', userData);

        nameOutputElement.textContent = nameValue;
        jobOutputElement.textContent = jobValue;

        closeModal(popupTypeEdit);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
          toggleLoadingButtonText(evt.submitter, false);
          setTimeOutInputReset(formEditProfile);
          clearValidation(formEditProfile, validationConfig);
      });
}

// Функция создания слушателей событий
const setupEventListeners = () => {
  editProfileButton.addEventListener('click', () => {
    openModal(popupTypeEdit);


    profileNameInput.value = nameOutputElement.textContent;
    profileJobInput.value = jobOutputElement.textContent;
  });
  addCardButton.addEventListener('click', () => openModal(popupTypeNewCard));
  formNewPlace.addEventListener('submit', addCardSubmit);
  formEditProfile.addEventListener('submit', editProfileSubmit);
  editAvatarButton.addEventListener('click', () => openModal(popupTypeAvatar));
  formNewAvatar.addEventListener('submit' , editProfileAvatarSubmit);
  popupErrorButtonSubmit.addEventListener('click', () => closeModal(popupTypeError));
}

// Функция обработки отправки формы добавления карточки
const addCardSubmit = (evt) => {
    evt.preventDefault();
    toggleLoadingButtonText(evt.submitter, true);

    const cardNameValue = cardNameInput.value;
    const cardLinkValue = cardLinkInput.value;
    checkImageUrl(cardLinkValue)
        .then((validUrl) => {
            return createNewCardRequest(cardNameValue, validUrl)
        })
        .then(card => {
            addCard(card.name, card.link, card.likes, card._id, card.owner._id, appState.globalUserId);
            closeModal(popupTypeNewCard);
        })
        .catch(err => {
            errorTextElement.textContent = `${err.message}`;
            openModal(popupTypeError);
            popupErrorButton.disabled = false;
        })
        .finally(() => {
            toggleLoadingButtonText(evt.submitter, false);
            clearValidation(formNewPlace, validationConfig);
            setTimeOutInputReset(formNewPlace);
        });
}

// Функция добавления задержки при очистке формы (для визуала)
const setTimeOutInputReset = (form) => {
  setTimeout(() => form.reset(), 300);
}

// Инициализация
setupEventListeners();

// Настройки валидации
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

// Включение валидации
enableValidation(validationConfig);

// Загрузка данных из сервера
Promise.all([getProfileRequest(), getInitialCardsRequest()])
    .then(([userData, cards]) => {
        appState.globalUserId = userData._id;
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

        profileAvatar.classList.remove('preloader');
        profileTitle.classList.remove('preloader');
        profileDescription.classList.remove('preloader');

        const cardPreloaderContainer = document.querySelector('.cards-preloader');
        cardPreloaderContainer.classList.remove('cards-preloader');

        const cardPreloader = document.querySelectorAll('.card-preloader');
        cardPreloader.forEach(preloader => {
             preloader.remove();
        });

        cards.reverse().forEach((card) => {
             addCard(card.name, card.link, card.likes, card._id, card.owner._id, appState.globalUserId);
        });
    })
    .catch((err) => {

      console.log(err);
    });