const cardTemplate = document.querySelector('#card-template').content;

export function createCard(element, deleteCard, likeCard, openImage) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardTitle.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;

  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', likeCard);
  cardImage.addEventListener('click', openImage);

  return cardElement;
}

export function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}