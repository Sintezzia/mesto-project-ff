
import { cardTemplate } from '../index.js';
// Функция создания карточки
function createCard(name, link, delCard, likeHandler, ImageHandler) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = card.querySelector('.card__delete-button');
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    // обработчик для открытия изображения
    cardImage.addEventListener('click', () => ImageHandler(link, name));

    // обработчик удаления карточки
    deleteButton.addEventListener('click', (evt) => delCard(evt));

    // обработчик лайка карточки
    card.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('card__like-button')) {
            evt.target.classList.toggle('card__like-button_is-active');
            if (likeHandler) {
                likeHandler(evt);
            }
        }
    });

    return card;
}

// Функция удаления карточки
function delCard(evt) {
    evt.target.closest('.places__item').remove();
}

// функция обработчка лайка карточки
function cardLike(evt) {
    const likeButton = evt.target;
    const isLiked = likeButton.classList.contains('card__like-button_is-active');

    // вывод в консоль сообщения собыития лайка
    if (isLiked) {
        console.log('Card liked', evt);
    } else {
        console.log('Card unliked', evt);
    }
}

export { cardLike, delCard, createCard };