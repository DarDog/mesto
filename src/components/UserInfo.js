export default class UserInfo {
  constructor({name, description}) {
    this._name = name;
    this._description = description;
  }


  getUserInfo() {
    return {
      name: this._name,
      description: this._description
    }
  }

  setUserInfo(data) {
    this._name = data.profileName;
    this._description = data.profileDescription;
  }
}