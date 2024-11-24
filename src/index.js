import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

const placesList = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');

const editPopup = document.querySelector('.popup_type_edit');
const profileForm = document.forms['edit-profile'];
const profileTitleField = profileForm.elements.name;
const profileDescriptionField = profileForm.elements.description;

const newCardForm = document.forms['new-place'];
const newCardName = newCardForm.elements['place-name'];
const newCardLink = newCardForm.elements.link;

const addNewCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');

const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

profileEditButton.addEventListener('click', () => {
  profileTitleField.value = profileTitle.textContent;
  profileDescriptionField.value = profileDescription.textContent;
  profileForm.addEventListener('submit', handleFormSubmit);
  openModal(editPopup);
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleField.value;
  profileDescription.textContent = profileDescriptionField.value;
  profileForm.removeEventListener('submit', handleFormSubmit);
  closeModal(editPopup);
}

addNewCardButton.addEventListener('click', () => {
  newCardForm.addEventListener('submit', addNewCard);
  clearNewCardForm();
  openModal(newCardPopup);
});

function clearNewCardForm() {
  newCardName.value = '';
  newCardLink.value = '';
}

function addNewCard(evt) {
  const newElement = {
    name: newCardName.value,
    link: newCardLink.value
  };

  evt.preventDefault();
  initialCards.unshift(newElement);
  placesList.prepend(createCard(newElement, deleteCard, likeCard, openImage));
  closeModal(newCardPopup);
  newCardPopup.removeEventListener('submit', addNewCard);
}

function openImage(evt) {
  const link = evt.target.src;
  const description = evt.target.parentElement.querySelector('.card__description').textContent;

  popupImage.src = link;
  popupImage.alt = description;
  popupCaption.textContent = description;
  
  openModal(imagePopup);
}

initialCards.forEach(element => {
  placesList.append(createCard(element, deleteCard, likeCard, openImage));
});