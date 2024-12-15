const cardTemplate = document.querySelector('#card-template').content;

export function createCard(element, deleteCard, likeCard, isLiked, openImage) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeNumber = cardElement.querySelector('.card__like-count');

  cardTitle.textContent = element['name'];
  cardImage.src = element['link'];
  cardImage.alt = element['name'];
  likeNumber.textContent = element['likes'].length;

  setLikeState(likeButton, isLiked);

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

export function setLikeState(button, isLiked) {
  if (isLiked) {
    button.classList.add('card__like-button_is-active');
  } else {
    button.classList.remove('card__like-button_is-active');
  }
}
