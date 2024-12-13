import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';

const placesList = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const profileEditButton = document.querySelector('.profile__edit-button');

const editPopup = document.querySelector('.popup_type_edit');
const profileForm = document.forms['edit-profile'];
const profileTitleField = profileForm.elements.name;
const profileDescriptionField = profileForm.elements.description;

const newCardForm = document.forms['new-place'];
const newCardName = newCardForm.elements['place-name'];
const newCardLink = newCardForm.elements.link;
const newCardButton = newCardForm.querySelector('.popup__button');

const addNewCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');

const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

profileEditButton.addEventListener('click', () => {
  profileTitleField.value = profileTitle.textContent;
  profileDescriptionField.value = profileDescription.textContent;
  profileForm.addEventListener('submit', handleFormSubmit);
  clearValidation(profileForm, validationConfig);
  openModal(editPopup);
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  fetch('https://nomoreparties.co/v1/wff-cohort-28/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '9494bd33-a3e0-4c43-b033-3b2e454315dd',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: profileTitleField.value,
      about: profileDescriptionField.value
    })
  });
  profileTitle.textContent = profileTitleField.value;
  profileDescription.textContent = profileDescriptionField.value;
  profileForm.removeEventListener('submit', handleFormSubmit);
  closeModal(editPopup);
}

addNewCardButton.addEventListener('click', () => {
  newCardForm.addEventListener('submit', addNewCard);
  clearNewCardForm();
  clearValidation(newCardForm, validationConfig);
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

  fetch('https://nomoreparties.co/v1/wff-cohort-28/cards', {
    method: 'POST',
    headers: {
      authorization: '9494bd33-a3e0-4c43-b033-3b2e454315dd',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: newElement['name'],
      link: newElement['link']
    })
  })
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    console.log(data);
  })

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

enableValidation(validationConfig);


const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-28',
  headers: {
    authorization: '9494bd33-a3e0-4c43-b033-3b2e454315dd',
    'Content-Type': 'application/json'
  }
}

const userRequest = fetch('https://nomoreparties.co/v1/wff-cohort-28/users/me', {
  headers: {
    authorization: '9494bd33-a3e0-4c43-b033-3b2e454315dd'
  }
})
  .then((res) => {
    if(res.ok) {
      return res.json();
    } else {
      console.log('user data fetch error');
    }
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });

  const cardsRequest = fetch('https://nomoreparties.co/v1/wff-cohort-28/cards', {
    headers: {
      authorization: '9494bd33-a3e0-4c43-b033-3b2e454315dd'
    }
  })
    .then((res) => {
      if(res.ok) {
        return res.json();
      } else {
        console.log('cards data fetch error');
      }
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });

Promise.all([userRequest, cardsRequest]).then((data) => {
  const user = data[0];
  const cards = data[1];
  profileTitle.textContent = user['name'];
  profileDescription.textContent = user['about'];
  profileImage.style.backgroundImage = `url('${user['avatar']}')`;

  cards.forEach(element => {
    if (element['owner']['_id'] === user['_id']){
      placesList.append(createCard(element, deleteCard, likeCard, openImage));
    } else {
      placesList.append(createCard(element, undefined, likeCard, openImage));
    }
  });
});