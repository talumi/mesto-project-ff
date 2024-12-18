import { checkResponse } from './utils';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-28',
  headers: {
    authorization: '9494bd33-a3e0-4c43-b033-3b2e454315dd',
    'Content-Type': 'application/json'
  }
}

function request(url, options) {
  return fetch(url, options).then(checkResponse)
}

export const userRequest = () => {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers
  });
}

export const getInitialCards = () => {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers
  });
}

export const updateProfileImage = (value) => {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: value
    })
  });
}

export const editProfileInfo = (name, about) => {
  return request('https://nomoreparties.co/v1/wff-cohort-28/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  });
}

export const putLike = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  });
}

export const deleteLike = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  });
}

export const addNewCardRequest = (element) => {
  return request(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: element['name'],
      link: element['link']
    })
  });
}

export const deleteCardRequest = (cardId) => {
  return request(`https://nomoreparties.co/v1/wff-cohort-28/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  });
}