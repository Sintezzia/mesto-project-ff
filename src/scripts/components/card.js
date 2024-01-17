import { cardTemplate } from '../index.js';
// Функция создания карточки
function createCard(name, link, delCard, likeHandler, imageHandler) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = card.querySelector('.card__delete-button');
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const likeButton = card.querySelector('.card__like-button');

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    // обработчик для открытия изображения
    cardImage.addEventListener('click', () => imageHandler(link, name));

    // обработчик удаления карточки
    deleteButton.addEventListener('click', (evt) => delCard(evt));

    // обработчик лайка карточки
    likeButton.addEventListener('click', (evt) => likeHandler(evt));

    return card;
}

// Функция удаления карточки
function delCard(evt) {
    evt.target.closest('.places__item').remove();
}

// функция обработчка лайка карточки
function cardLike(evt) {
    const likeButton = evt.target;
    likeButton.classList.toggle('card__like-button_is-active');
    const isLiked = likeButton.classList.contains('card__like-button_is-active');

    // вывод в консоль сообщения события лайка
    console.log(isLiked ? 'Card liked' : 'Card unliked', evt);
}



export { cardLike, delCard, createCard };