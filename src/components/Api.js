export default class Api {
  constructor({cohort, token}) {
    this._cohort = cohort;
    this._token = token
  }


  getUserInfo() {
    return fetch(`https://nomoreparties.co/v1/${this._cohort}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
        .then((res) => {
          if (res.ok) {
            return res.json()
          } else {
            return Promise.reject(`Ошибка: ${res.status}`)
          }
        });
  }

  getInitialCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {
      headers: {
        authorization: this._token
      }
    })
        .then((res) => {
          if (res.ok) {
            return res.json()
          } else {
            return Promise.reject(`Ошибка: ${res.status}`)
          }
        });
  }

  editUserInfo(data) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
        .then((res) => {
          if (res.ok) {
            return res.json()
          } else {
            return Promise.reject(`Ошибка: ${res.status}`)
          }
        });
  }

}