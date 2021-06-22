const popUps = document.querySelectorAll('.pop-up'),
    editPopUp = document.querySelector('.pop-up_content_edit'),
    addPopUp = document.querySelector('.pop-up_content_add'),
    imagePopUp = document.querySelector('.pop-up_content_image'),
    editFormElement = document.querySelector('[name=editForm]'),
    addFormElement = document.querySelector('[name=addForm]'),
    closeButtons = document.querySelectorAll('.pop-up__exit-button'),
    editButton = document.querySelector('.profile__edit-button'),
    addButton = document.querySelector('.profile__add-button'),
    nameInput = editFormElement.querySelector('[name=profileName]'),
    descriptionInput = editFormElement.querySelector('[name=profileDescription]'),
    cardNameInput = addFormElement.querySelector('[name=cardName]'),
    cardSrcInput = addFormElement.querySelector('[name=cardLink]'),
    profileName = document.querySelector('.profile__title'),
    profileDescription = document.querySelector('.profile__subtitle'),
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

const openEditPopUp = () => {
  editPopUp.classList.add('pop-up_opened');

  fillInputs();
}

const openAddPopUp = () => {
  addPopUp.classList.add('pop-up_opened');
}

const openImagePopUp = () => {
  imagePopUp.classList.add('pop-up_opened');
}

const closePopUp = () => {
  popUps.forEach((item) => {
    item.classList.remove('pop-up_opened');
  })
}

const editFormSubmitHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopUp();
}

const addFormSubmitHandler = (evt) => {
  evt.preventDefault();
  getCard(cardNameInput.value, cardSrcInput.value);
  closePopUp();
}

const getCard = (title, src) => {
  const cardTemplate = document.querySelector('#card_template').content,
      cardsPlace = document.querySelector('.elements__cards'),
      cardClone = cardTemplate.cloneNode(true),
      deleteButton = cardClone.querySelector('.card__delete-button')

  cardClone.querySelector('.card__title').textContent = title;
  cardClone.querySelector('.card__image').src = src;
  cardClone.querySelector('.card__image').alt = title;

  cardClone.querySelector('.card__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-button_active');
  });

  deleteButton.addEventListener('click', () => {
    const cardsElement = deleteButton.closest('.card');
    cardsElement.remove();
  });

  cardClone.querySelector('.card__image').addEventListener('click', (evt) => {
    openImagePopUp();
    const evtTarget = evt.target;
    imagePopUp.querySelector('.pop-up__image').src = evtTarget.src;
    imagePopUp.querySelector('.pop-up__image').alt = evtTarget.alt;
    imagePopUp.querySelector('.pop-up__image-title').textContent = evtTarget.alt;
  });

  cardsPlace.prepend(cardClone)
}

const getUsersCards = (usersCards) => {
  usersCards.forEach((item) => {
    return getCard(item.title, item.src)
  });
}

getUsersCards(usersCards);

editButton.addEventListener('click', openEditPopUp);
addButton.addEventListener('click', openAddPopUp);
closeButtons.forEach((item) => {
  item.addEventListener('click', closePopUp);
});

editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addFormSubmitHandler);
