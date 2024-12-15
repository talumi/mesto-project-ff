const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-28',
  headers: {
    authorization: '9494bd33-a3e0-4c43-b033-3b2e454315dd',
    'Content-Type': 'application/json'
  }
}

export const userRequest = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
}

export const updateProfileImage = (value) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: value
    })
  })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
}

export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
}

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      /*return Promise.reject(`Ошибка: ${res.status}`);*/
    })
    /*.catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });*/
}

export const addNewCardRequest = (element) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: element['name'],
      link: element['link']
    })
  })
    .then((res) => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
}

export const deleteCardRequest = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-28/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '9494bd33-a3e0-4c43-b033-3b2e454315dd',
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
}