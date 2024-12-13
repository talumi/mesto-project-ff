const cardTemplate = document.querySelector('#card-template').content;

export function createCard(element, deleteCard, likeCard, openImage) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeNumber = cardElement.querySelector('.card__like-number');

  cardTitle.textContent = element['name'];
  cardImage.src = element['link'];
  cardImage.alt = element['name'];
  likeNumber.textContent = element['likes'].length;

  likeButton.addEventListener('click', likeCard);
  cardImage.addEventListener('click', openImage);

  if (deleteCard) {
    deleteButton.addEventListener('click', deleteCard);
  } else {
    deleteButton.classList.add('card__delete-button_hidden');
  }

  return cardElement;
}

export function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}