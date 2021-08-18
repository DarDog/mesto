import Popup from "./Popup";

export default class PopupWithDeleteForm extends Popup {
  constructor({popupSelector, formSubmit}) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector('.form');
    this._submitButton = this._form.querySelector('.form__submit-button')
  }

  open(data) {
    super.open();
    this._cardId = data.id;
    this._cardElement = data.card
  }


  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', this._submitForm)
  }

  _submitForm = (evt) => {
    evt.preventDefault();
    this._formSubmit({
      id: this._cardId,
      card: this._cardElement
    })
    this.close();
  }
}