import { cardTemplate } from '../index.js';
import { cardLikeRequest, deleteCardRequest } from "./api";
import { popupTypeConfirmDelete } from "../index.js";
import { closeModal, openModal } from "./modal";

// Функция создания карточки
export const createCard = (name, link, likes, cardId, cardOwnerId, userId, delCard, likeHandler, imageHandler) => {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = card.querySelector('.card__delete-button');
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const likeButton = card.querySelector('.card__like-button');
    const likeCount = card.querySelector('.card__like-counter');

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;
    likeCount.textContent = likes.length;

    if (cardOwnerId === userId) {
        deleteButton.style.display = 'block';
    } else {
        deleteButton.style.display = 'none';
    }

    const isLikedByCurrentUser = likes.some(user => user._id === userId);
    if (isLikedByCurrentUser) {
        likeButton.classList.add('card__like-button_is-active');
    }
    // обработчик для открытия изображения
    cardImage.addEventListener('click', () => imageHandler(link, name));

    // обработчик удаления карточки
    deleteButton.addEventListener('click', () => {
        openModal(popupTypeConfirmDelete);
        const confirmButton = document.querySelector('.popup__button_confirm-delete');
        confirmButton.onclick = () => {
            deleteCardRequest(cardId)
                .then(() => {
                    delCard(card);
                    closeModal(popupTypeConfirmDelete);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
    });

    // обработчик лайка карточки
    likeButton.addEventListener('click', (evt) => {
        const method = likeButton.classList.contains('card__like-button_is-active') ? 'DELETE' : 'PUT';
        cardLikeRequest(cardId, method)
            .then((result) => {
                cardLike(evt, result.likes.length, likeButton);
            })
            .catch((err) => {
                console.error(err);
            });
    });

    return card;
}

// Функция удаления карточки
export const delCard = (card) => {
    card.remove();
}

// Функция обработчка лайка карточки
export const cardLike = (evt, newLikeCount, likeButton) => {
    likeButton.classList.toggle('card__like-button_is-active');
    const likeCounterElement = evt.target.closest('.card').querySelector('.card__like-counter');
    likeCounterElement.textContent = newLikeCount;
}