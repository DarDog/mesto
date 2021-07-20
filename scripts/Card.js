import {openPopUp, popUpTypeImage, popUpTypeImageContentImage, popUpTypeImageContentTitle} from "./index.js";

export class Card {
  constructor(data, template) {
    this._name = data.title;
    this._link = data.src;
    this._template = template;
  }

  _getTemplate() {
    return document
        .querySelector(this._template)
        .content
        .querySelector('.card')
        .cloneNode(true);
  }

  _changeStateLikeButton() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active')
  }

  _deleteCard() {
    this._element.remove();
  }

  _openImagePopup() {
      openPopUp(popUpTypeImage);

    popUpTypeImageContentImage.src = this._link;
    popUpTypeImageContentTitle.textContent = this._name
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._changeStateLikeButton();
    });
    this._element.querySelector('.card__delete-button').addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._openImagePopup();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element
  }
}