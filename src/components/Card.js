import { popUpTypeImage, popUpTypeImageContentImage, popUpTypeImageContentTitle } from '../utils/constants.js';
import { openPopUp } from '../index.js'

export default class Card {
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
    const cardImage = this._element.querySelector('.card__image'),
        cardTitle = this._element.querySelector('.card__title');

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    return this._element
  }
}