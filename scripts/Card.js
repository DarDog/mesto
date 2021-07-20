class Card {
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

      const popUpsContentImage = popUpTypeImage.querySelector('.pop-up__image'),
          popUpsContentTitle = popUpTypeImage.querySelector('.pop-up__image-title')

      popUpsContentImage.src = this._link;
      popUpsContentTitle.textContent = this._name
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
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element
  }
}

const preparedCards = [
  {
    title: 'Сахалин Холмск',
    src: 'images/kholmskoe-vodohranilishe.jpg'
  },
  {
    title: 'Япония',
    src: 'images/japan.jpg'
  },
  {
    title: 'Италия',
    src: 'images/italy.jpg'
  },
  {
    title: 'Франция',
    src: 'images/Franch.jpg'
  },
  {
    title: 'Сахалин Чертов мост',
    src: 'images/chertov-most.jpg'
  },
  {
    title: 'Замок Burg Eltz',
    src: 'images/Burg%20Eltz.jpg'
  },
];

preparedCards.forEach((el) => {
  const card = new Card(el, '#card_template'),
      cardElement = card.generateCard();

  document.querySelector('.elements__cards').append(cardElement);
})