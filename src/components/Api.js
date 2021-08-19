export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headersContent = options.headers
  }


  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headersContent
    })
        .then((res) => {
          return this._getResponseData(res);
        });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headersContent
    })
        .then((res) => {
          return this._getResponseData(res);
        });
  }

  sendUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headersContent,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
        .then((res) => {
          return this._getResponseData(res);
        });
  }

  sendCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headersContent,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
        .then((res) => {
          return this._getResponseData(res);
        });
  }

  deleteCard(data) {
    return fetch(`${this._baseUrl}/cards/${data}`, {
      method: 'DELETE',
      headers: this._headersContent,
    })
        .then((res) => {
          return this._getResponseData(res);
        });
  }

  sendLike(data) {
    return fetch(`${this._baseUrl}/cards/likes/${data}`, {
      method: 'PUT',
      headers: this._headersContent
    })
        .then((res) => {
          return this._getResponseData(res);
        });
  }

  deleteLike(data) {
    return fetch(`${this._baseUrl}/cards/likes/${data}`, {
      method: 'DELETE',
      headers: this._headersContent,
    })
        .then((res) => {
          return this._getResponseData(res);
        });
  }

  sendAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headersContent,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
        .then((res) => {
          return this._getResponseData(res);
        });
  }


  _getResponseData(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }
}