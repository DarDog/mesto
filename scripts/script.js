const popUp = document.querySelector('.pop-up'),
    editFormElement = popUp.querySelector('[name=editForm]'),
    addFormElement = popUp.querySelector('[name=addForm]'),
    closeButton = document.querySelector('.pop-up__exit-button'),
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
  popUp.classList.add('pop-up_opened');
  editFormElement.classList.remove('pop-up__container_disable');
  addFormElement.classList.add('pop-up__container_disable');
  popUp.querySelector('.pop-up__title').textContent = 'Редактировать профиль';
  fillInputs();
}

const openAddPopUp = () => {
  popUp.classList.add('pop-up_opened');
  editFormElement.classList.add('pop-up__container_disable');
  addFormElement.classList.remove('pop-up__container_disable');
  popUp.querySelector('.pop-up__title').textContent = 'Новое место';
}

const closePopUp = () => {
  popUp.classList.remove('pop-up_opened');
}

const editFormSubmitHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopUp();
}

const addFormSubmitHandler = (evt) => {
  evt.preventDefault();
  console.log(cardNameInput.value)
  console.log(cardSrcInput.value)
  getCard(cardNameInput.value, cardSrcInput.value);
  closePopUp();
}

const getCard = (title, src) => {
  const cardTemplate = document.querySelector('#card_template').content,
      cardsPlace = document.querySelector('.elements__cards'),
      cardClone = cardTemplate.cloneNode(true);

  cardClone.querySelector('.card__title').textContent = title;
  cardClone.querySelector('.card__image').src = src;
  cardClone.querySelector('.card__image').alt = title;

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
closeButton.addEventListener('click', closePopUp);

editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addFormSubmitHandler);
