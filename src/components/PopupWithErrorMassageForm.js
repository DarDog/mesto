import Popup from "./Popup";

export default class PopupWithErrorMassageForm extends Popup {
  constructor({ popupSelector, formSubmit }) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector('.form');
  }


  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', this._submitForm)
  }

  _submitForm = (evt) => {
    evt.preventDefault();
    this._formSubmit();
  }
}