import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor({ popupSelector, formSubmit }) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector('.form');
    this._submitButton = this._form.querySelector('.form__submit-button')
    this._inputList = this._form.querySelectorAll('.form__input')
  }


  close() {
    super.close();
    this._form.reset();
    this._submitButton.classList.add('form__submit-button_disable');
    this._submitButton.setAttribute("disabled", true);
  }


  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', this._submitForm)
  }

  _getInputValues() {
    const inputValues = {}
    this._inputList.forEach(el => {
      inputValues[el.name] = el.value;
    })
    return inputValues
  }

  _submitForm = (evt) => {
    evt.preventDefault();
    this._formSubmit(this._getInputValues())
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener('submit', this._submitForm)
  }
}