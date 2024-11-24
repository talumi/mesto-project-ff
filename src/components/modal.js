export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', onPressEsc);
  setTimeout(() => {
    document.addEventListener('click', onClickOutside)
  }, 1);
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', onPressEsc);
  document.removeEventListener('click', onClickOutside);
}

function onPressEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

function onClickOutside(evt) {
  let evtClassList = evt.target.classList;
  if (evtClassList.contains('popup')) {
    closeModal(evt.target);
  }
  if (evtClassList.contains('popup__close')) {
    closeModal(evt.target.closest('.popup'));
  }
}