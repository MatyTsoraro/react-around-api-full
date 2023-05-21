import { baseUrl, headers } from "./constants";

class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _processResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`An error just occurred: ${res.status}`);
    }
  }

  // When the user logs in or logs out, update the user token in the request header.
  updatedAuthUserToken = (token) => {
    this.headers = { ...this.headers, authorization: `Bearer ${token}` };
  };

  getInitialcards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then(this._processResponse);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then(this._processResponse);
  }

  setUserInfo({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._processResponse);
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._processResponse);
  }

  addCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(this._processResponse);
  }

  removeCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._processResponse);
  }

  cardLike(id, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: method,
      headers: this.headers,
    }).then(this._processResponse);
  }
}

const api = new Api({ baseUrl, headers });

export default api;
