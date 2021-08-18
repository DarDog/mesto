export default class Api {
  constructor({cohort, token}) {
    this._cohort = cohort;
    this._token = token
  }

  getUserInfo() {
    return fetch(`https://nomoreparties.co/v1/${this._cohort}/users/me`, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
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
}