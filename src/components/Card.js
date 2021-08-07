export default class Card {
  constructor(handleCardClick, data, template) {
    this._name = data.cardName;
    this._link = data.cardLink;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }


  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._setEventListeners();
    const cardTitle = this._element.querySelector('.card__title');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    return this._element
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

  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._changeStateLikeButton();
    });
    this._element.querySelector('.card__delete-button').addEventListener('click', () => {
      this._deleteCard();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({
        link: this._link,
        name: this._name
      });
    });
  }
}