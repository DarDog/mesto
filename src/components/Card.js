export default class Card {
  constructor(handlers, template) {
    this._template = template;
    this._handleCardClick = handlers.handleCardClick;
    this._handleDeleteClick = handlers.handleDeleteClick;
    this._handleLikeClick = handlers.handleLikeClick
  }


  generateCard(data) {
    this._element = this._getTemplate();
    this._name = data.name;
    this._link = data.link;
    this._likesList = data.likes
    this._likeCount = this._likesList.length
    this._id = data._id
    this._autorId = data.owner._id
    this._likeButton = this._element.querySelector('.card__like-button');
    this._cardLikes = this._element.querySelector('.card__like-count')
    this._likesList.forEach(el => {
      if (el._id === this._autorId) {
        this._likeButton.classList.add('card__like-button_active')
      }
    })
    this._cardImage = this._element.querySelector('.card__image');
    if (this._autorId === this._autorId) {
      this._deleteButton = document.createElement('button')
      this._element.append(this._deleteButton);
      this._deleteButton.classList.add('card__delete-button');
    }

    this._setEventListeners();
    const cardTitle = this._element.querySelector('.card__title');


    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    cardTitle.textContent = this._name;
    this._cardLikes.textContent = this._likeCount;

    return this._element
  }

  _setLikesCount = (data) => {
    this._cardLikes.textContent = data
  }

  _changeStateLikeButton = () => {
    this._likeButton.classList.toggle('card__like-button_active');
  }


  _getTemplate() {
    return document
        .querySelector(this._template)
        .content
        .querySelector('.card')
        .cloneNode(true);
  }

  _deleteCard = () => {
    this._element.remove()
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick({
            cardId: this._id,
            isLiked: !this._likeButton.classList.contains('card__like-button_active'),
          },
          this._changeStateLikeButton,
          this._setLikesCount)
    });
    if (this._deleteButton) {
      this._deleteButton.addEventListener('click', () => {
        this._handleDeleteClick({
              card: this._element,
              id: this._id
            },
            this._deleteCard)
      });
    }
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({
        link: this._link,
        name: this._name
      });
    });
  }
}