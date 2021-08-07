import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor({ popupSelector, formSubmit }) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector('form');
    this._inputList = this._form.querySelectorAll('.form__input')
  }


  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm)
  }

  close() {
    super.close();
    this._form.reset();
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
    this.close();
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener('submit', this._submitForm)
  }
}