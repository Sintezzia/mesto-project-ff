// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; 

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(name, link, delCard) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = card.querySelector('.card__delete-button');

  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').alt = name;
  card.querySelector('.card__title').textContent = name;

  deleteButton.addEventListener('click', (event) => delCard(event));

  return card;
}

// @todo: Функция удаления карточки
function delCard(event) {
  event.target.closest('.places__item').remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach((item) => PlacesList.appendChild(createCard(item.name, item.link, delCard)));