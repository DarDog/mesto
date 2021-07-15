const popUpTypeEdit = document.querySelector('.pop-up_content_edit'),
    popUpTypeAdd = document.querySelector('.pop-up_content_add'),
    popUpTypeImage = document.querySelector('.pop-up_content_image'),
    editFormElement = document.querySelector('[name=editForm]'),
    addFormElement = document.querySelector('[name=addForm]'),
    editButton = document.querySelector('.profile__edit-button'),
    addButton = document.querySelector('.profile__add-button'),
    nameInput = editFormElement.querySelector('[name=profileName]'),
    descriptionInput = editFormElement.querySelector('[name=profileDescription]'),
    cardNameInput = addFormElement.querySelector('[name=cardName]'),
    cardSrcInput = addFormElement.querySelector('[name=cardLink]'),
    profileName = document.querySelector('.profile__title'),
    profileDescription = document.querySelector('.profile__subtitle'),
    cardsContainer = document.querySelector('.elements__cards'),
    preparedCards = [
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

const fillInputs = () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

const openPopUp = (popUp) => {
  popUp.classList.add('pop-up_opened');

  document.addEventListener('keydown', closePopUpByClickAtEsc);
  popUp.addEventListener('click', closePopUpByClickAtOverlay);
  popUp.addEventListener('click', closePopUpByClickAtCloseButton);
}

const closePopUp = (popUp) => {
  popUp.classList.remove('pop-up_opened');

  document.removeEventListener('keydown', closePopUpByClickAtEsc);
  popUp.removeEventListener('click', closePopUpByClickAtOverlay);
  popUp.removeEventListener('click', closePopUpByClickAtCloseButton);
}

/*Методы закрытия попапов*/
const closePopUpByClickAtCloseButton = (evt) => {
  const popUp = evt.currentTarget,
      closeButton = evt.target;

  if (closeButton.classList.contains('pop-up__exit-button')) {
    closePopUp(popUp)
  }
}

const closePopUpByClickAtOverlay = (evt) => {
  const isOverlay = evt.target.classList.contains('pop-up'),
      popUp = evt.target;
  if (isOverlay) {
    closePopUp(popUp);
  }
}

const closePopUpByClickAtEsc = (evt) => {
  const popUp = document.querySelector('.pop-up_opened')

  if (evt.key === 'Escape') {
    closePopUp(popUp);
  }
}
/**/

/*Функции взаимодействия с карточками*/
const deleteCard = (deleteButton) => {
  const cardElement = deleteButton.closest('.card');
  cardElement.remove();
}

const addLikeToCard = (likeButton) => {
  likeButton.classList.toggle('card__like-button_active');
}

const openImagePopupByClickAtImage = (evt) => {
  openPopUp(popUpTypeImage);

  const popUpContentImage = popUpTypeImage.querySelector('.pop-up__image'),
      popUpContentTitle = popUpTypeImage.querySelector('.pop-up__image-title');

  popUpContentImage.src = evt.src;
  popUpContentImage.alt = evt.alt;
  popUpContentTitle.textContent = evt.alt;
}

const chooseActionWithCard = (evt) => {
  if (evt.target.classList.contains('card__delete-button')) {
    deleteCard(evt.target);
  } else if (evt.target.classList.contains('card__like-button')) {
    addLikeToCard(evt.target);
  } else if (evt.target.classList.contains('card__image')) {
    openImagePopupByClickAtImage(evt.target);
  }
}
/**/

/*Функции отправки форм*/
const editFormSubmitHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopUp(popUpTypeEdit);
}

const addFormSubmitHandler = (evt) => {
  const createButton = popUpTypeAdd.querySelector('.form__submit-button')
  evt.preventDefault();
  addCard(cardsContainer, createCard(cardNameInput.value, cardSrcInput.value));
  addFormElement.reset()
  createButton.classList.add('form__submit-button_disable')
  closePopUp(popUpTypeAdd);
}
/**/

/*Функции создание и добавления карточек*/
const createCard = (title, src) => {
  const cardTemplate = document.querySelector('#card_template').content,
      cardClone = cardTemplate.cloneNode(true),
      cardImage = cardClone.querySelector('.card__image'),
      cardTitle = cardClone.querySelector('.card__title');

  cardTitle.textContent = title;
  cardImage.src = src;
  cardImage.alt = title;

  return cardClone;
}

const addCard = (container, cardElement) => {
  container.prepend(cardElement);
}

const getPreparedCards = (preparedCards) => {
  preparedCards.forEach((item) => {
    return addCard(cardsContainer, createCard(item.title, item.src));
  });
}
/**/

getPreparedCards(preparedCards);
fillInputs();

editButton.addEventListener("click", () => {
  openPopUp(popUpTypeEdit);
});
addButton.addEventListener('click', () => {
  openPopUp(popUpTypeAdd);
});

cardsContainer.addEventListener('click', chooseActionWithCard);
editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit',addFormSubmitHandler);
