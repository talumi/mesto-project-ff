import './pages/index.css';
import { createCard, deleteCard, setLikeState } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { userRequest, getInitialCards, updateProfileImage, putLike, deleteLike,
          addNewCardRequest, deleteCardRequest, editProfileInfo } from './components/api.js';

const placesList = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const profileEditButton = document.querySelector('.profile__edit-button');

const profileEditPopup = document.querySelector('.popup_type_profile-info-edit');
const profileForm = document.forms['edit-profile'];
const profileTitleField = profileForm.elements.name;
const profileDescriptionField = profileForm.elements.description;
const profileEditFormSubmitButton = profileForm.elements.button;

const profileImageEditPopup = document.querySelector('.popup_type_profile-image-edit');
const profileImageForm = document.forms['new-profile-image'];
const profileImageLink = profileImageForm.elements.link;
const profileImageFormSubmitButton = profileImageForm.elements.button;

const newCardForm = document.forms['new-place'];
const newCardName = newCardForm.elements['place-name'];
const newCardLink = newCardForm.elements.link;
const newCardSubmitButton = newCardForm.elements.button;

const addNewCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');

const deleteAlertPopup = document.querySelector('.popup_type_delete-card');

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

enableValidation(validationConfig);

profileForm.addEventListener('submit', handleEditFormSubmit);
newCardForm.addEventListener('submit', createNewCardSubmit);
profileImageForm.addEventListener('submit', editProfileImageSubmit);

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileEditFormSubmitButton.textContent = 'Сохранение...';
  editProfileInfo(profileTitleField.value, profileDescriptionField.value)
    .then(() => {
      profileTitle.textContent = profileTitleField.value;
      profileDescription.textContent = profileDescriptionField.value;
      closeModal(profileEditPopup);
      profileEditFormSubmitButton.textContent = 'Сохранение';
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    })
}

function createNewCardSubmit(evt) {
  const newElement = {
    name: newCardName.value,
    link: newCardLink.value
  };

  evt.preventDefault();
  newCardSubmitButton.textContent = 'Сохранение...';

  addNewCardRequest(newElement)
    .then((data) => {
      placesList.prepend(createCard(data, createDeleteCallback(data['_id']), createLikeCardCallback(data['_id']), false, openImage));
      closeModal(newCardPopup);
      newCardSubmitButton.textContent = 'Сохранение';
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
}

function editProfileImageSubmit(evt) {
  evt.preventDefault();
    profileImageFormSubmitButton.textContent = 'Сохранение...';
    updateProfileImage(profileImageLink.value)
      .then(() => {
        profileImage.style.backgroundImage = `url(${profileImageLink.value})`;
        closeModal(profileImageEditPopup);
        profileImageFormSubmitButton.textContent = 'Сохранение';
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
}

profileEditButton.addEventListener('click', () => {
  profileTitleField.value = profileTitle.textContent;
  profileDescriptionField.value = profileDescription.textContent;
  clearValidation(profileForm, validationConfig);
  openModal(profileEditPopup);
});

addNewCardButton.addEventListener('click', () => {
  newCardName.value = '';
  newCardLink.value = '';
  clearValidation(newCardForm, validationConfig);
  openModal(newCardPopup);
});

function openImage(evt) {
  const link = evt.target.src;
  const description = evt.target.parentElement.querySelector('.card__title').textContent;

  popupImage.src = link;
  popupImage.alt = description;
  popupCaption.textContent = description;

  openModal(imagePopup);
}

function editProfileImage() {
  profileImageLink.value = '';
  clearValidation(profileImageForm, validationConfig);
  openModal(profileImageEditPopup);
}

let actualCallback;

function createDeleteCallback(cardId) {
  return function (evt) {
    openModal(deleteAlertPopup);
    const submitButton = deleteAlertPopup.querySelector('.popup__button');
    submitButton.removeEventListener('click', actualCallback);
    actualCallback = () => {
      deleteCard(evt);
      deleteCardRequest(cardId)
        .then(() => {
          closeModal(deleteAlertPopup);
        })
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
        });
    };
    submitButton.addEventListener('click', actualCallback);
  };
}

function createLikeCardCallback(cardId) {
  return function (evt) {
    const likesCounter = evt.target.closest('.like-container').querySelector('.card__like-count');

    if (evt.target.classList.contains('card__like-button_is-active')) {
      deleteLike(cardId)
      .then((data) => {
        likesCounter.textContent = data['likes'].length;
        setLikeState(evt.target, false);
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
    } else {
      putLike(cardId)
      .then((data) => {
        likesCounter.textContent = data['likes'].length;
        setLikeState(evt.target, true);
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
    }
  }
}

Promise.all([userRequest(), getInitialCards()]).then((data) => {
  const user = data[0];
  const cards = data[1];
  profileTitle.textContent = user['name'];
  profileDescription.textContent = user['about'];
  profileImage.style.backgroundImage = `url('${user['avatar']}')`;

  profileImage.addEventListener('click', editProfileImage);

  cards.forEach(element => {
    const likesList = element['likes'];
    const isLiked = likesList.some((element) => element['_id'] === user['_id']);

    if (element['owner']['_id'] === user['_id']){
      placesList.append(createCard(element, createDeleteCallback(element['_id']), createLikeCardCallback(element['_id']), isLiked, openImage));
    } else {
      placesList.append(createCard(element, undefined, createLikeCardCallback(element['_id']), isLiked, openImage));
    }
  });
});