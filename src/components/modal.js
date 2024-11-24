export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalEsc);
  const closeButton = popup.querySelector('.popup__close');
  const onCloseClick = () => {
    closeModal(popup);
    closeButton.removeEventListener('click', onCloseClick);
  }
  closeButton.addEventListener('click', onCloseClick);
  setTimeout(() => {
    document.addEventListener('click', closeModalOverlay)
  }, 1);
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalEsc);
  document.removeEventListener('click', closeModalOverlay);
}

function closeModalEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

function closeModalOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closeModal(evt.target);
  }
}