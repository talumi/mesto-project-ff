import './pages/index.css';
import { initialCards } from './scripts/cards.js';

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard(name, link, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardTitle.textContent = name;
  cardImage.src = link;
  deleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

function deleteCard(event) {
  event.target.closest('.card').remove();
}

initialCards.forEach(element => {
  placesList.append(createCard(element.name, element.link, deleteCard));
});