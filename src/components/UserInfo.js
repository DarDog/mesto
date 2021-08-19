export default class UserInfo {
  constructor({name, description, avatar}) {
    this._name = name;
    this._description = description;
    this._avatar = avatar
  }


  getUserInfo() {
    return {
      name: this._name,
      description: this._description,
      avatar: this._avatar
    }
  }

  setUserInfo(data) {
    this._name = data.name;
    this._description = data.about;
    this._avatar = data.avatar;
  }
}