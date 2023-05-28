class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }

  getInitialCards() {
    console.log('this._headers', this._headers);
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }
  getUserInfo() {
    console.log('this._headers', this._headers);
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }
  setUserInfo({ name, about }) {
    console.log('this._headers', this._headers);
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }
  createCard(data) {
    console.log('this._headers', this._headers);
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }
  deleteCard(cardId) {
    console.log('this._headers', this._headers);
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    console.log('this._headers', this._headers);
    if (!isLiked) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        headers: this._headers,
        method: 'DELETE',
      }).then(this._checkResponse);
    } else {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        headers: this._headers,
        method: 'PUT',
      }).then(this._checkResponse);
    }
  }

  setUserAvatar(url) {
    console.log('this._headers', this._headers);
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: url,
      }),
    }).then(this._checkResponse);
  }

  // other methods for working with the API
}

const api = new Api({
  baseUrl: 'https://react-around-api-full-five.vercel.app', //cohort-3-en
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json',
  },
});
export default api;
