const editPopUp = document.querySelector('.pop-up_content_edit'),
    addPopUp = document.querySelector('.pop-up_content_add'),
    imagePopUp = document.querySelector('.pop-up_content_image'),
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
    usersCards = [
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

  document.addEventListener('keydown', closePopUpBuClickAtEsc);
  popUp.addEventListener('click', closePopUpByClickAtOverlay);
  popUp.addEventListener('click', closePopUpByClickAtCloseButton);
}

const closePopUp = (popUp) => {
  popUp.classList.remove('pop-up_opened');

  document.removeEventListener('keydown', closePopUpBuClickAtEsc);
  popUp.removeEventListener('click', closePopUpByClickAtOverlay);
  popUp.removeEventListener('click', closePopUpByClickAtCloseButton);
}

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

const closePopUpBuClickAtEsc = (evt) => {
  const popUp = document.querySelector('.pop-up_opened')

  if (evt.key === 'Escape') {
    closePopUp(popUp);
  }
}

const editFormSubmitHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopUp();
}

const createCard = (title, src) => {
  const cardTemplate = document.querySelector('#card_template').content,
      cardClone = cardTemplate.cloneNode(true),
      cardImage = cardClone.querySelector('.card__image'),
      cardTitle = cardClone.querySelector('.card__title'),
      deleteButton = cardClone.querySelector('.card__delete-button');

  cardTitle.textContent = title;
  cardImage.src = src;
  cardImage.alt = title;

  cardClone.querySelector('.card__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-button_active');
  });

  deleteButton.addEventListener('click', () => {
    const cardsElement = deleteButton.closest('.card');
    cardsElement.remove();
  });

  cardImage.addEventListener('click', () => {
    openPopUp(imagePopUp);
    const popUpsContentImage = imagePopUp.querySelector('.pop-up__image');
    popUpsContentImage.src = src;
    popUpsContentImage.alt = title;
    imagePopUp.querySelector('.pop-up__image-title').textContent = title;
  })

  return cardClone;
}

const addCard = (container, cardElement) => {
  container.prepend(cardElement);
}

const getUsersCards = (usersCards) => {
  usersCards.forEach((item) => {
    return addCard(cardsContainer, createCard(item.title, item.src));
  });
}

getUsersCards(usersCards);

editButton.addEventListener("click", () => {
  fillInputs();
  openPopUp(editPopUp);
});
addButton.addEventListener('click', () => {
  openPopUp(addPopUp);
});

editFormElement.addEventListener('submit', editFormSubmitHandler);

addFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCard(cardsContainer, createCard(cardNameInput.value, cardSrcInput.value));
  addFormElement.reset()
  closePopUp();
});
