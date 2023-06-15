class Api {
  constructor(options) {
    this.options = options;
    this.headers = options.headers;
    this.baseUrl = options.baseUrl;
  }

  _getJsonPromise = (result) =>
    result.ok ? result.json() : Promise.reject(`Impossible to get result.json(): ${result.status}`);

  addCard = (name, link) =>
    fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._getJsonPromise);

  deleteCard = (cardId) =>
    fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    }).then(this._getJsonPromise);

  likeCard = (cardId) =>
    fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers,
    }).then(this._getJsonPromise);

  dislikeCard = (cardId) =>
    fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers,
    }).then(this._getJsonPromise);

  updateAvatar = (link) =>
    fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._getJsonPromise);

  updateUserInfo = (name, about) =>
    fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._getJsonPromise);

  getUserInfo = () =>
    fetch(`${this.baseUrl}/users/me `, {
      headers: this.headers,
    }).then(this._getJsonPromise);

  getInitialCards = () =>
    fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then(this._getJsonPromise);

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'b5ca8ab9-6ed2-4347-9257-2874be1468dc',
    'Content-Type': 'application/json',
  },
});
