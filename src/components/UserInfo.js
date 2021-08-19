export default class UserInfo {
  constructor({name, description, avatar}) {
    this._name = name;
    this._description = description;
    this._avatar = avatar
  }


  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
      avatar: this._avatar.src
    }
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._description.textContent = data.about;
    this._avatar.src = data.avatar;
    this._id = data._id
  }
}