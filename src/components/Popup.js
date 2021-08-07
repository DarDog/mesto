export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._popupCloseButton = this._popup.querySelector('.pop-up__exit-button')
  }


  open() {
    this._popup.classList.add('pop-up_opened');
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('pop-up_opened');
    this._removeEventListeners();
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._closePopupByClickAtOverlay)
    this._popupCloseButton.addEventListener('click', this._closePopupByCloseButton);
    document.addEventListener('keydown', this._handleEscClose);
  }


  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  _closePopupByClickAtOverlay = (evt) => {
    const isOverlay = evt.target.classList.contains('pop-up');
    if (isOverlay) {
      this.close()
    }
  }

  _closePopupByCloseButton = () => {
    this.close();
  }

  _removeEventListeners() {
    this._popup.removeEventListener('click', this._closePopupByClickAtOverlay);
    this._popupCloseButton.removeEventListener('click', this._closePopupByCloseButton);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}