const popUp = document.querySelector('.pop-up'),
    formElement = popUp.querySelector('.pop-up__container'),
    closeButton = formElement.querySelector('.pop-up__exit-button'),
    editButton = document.querySelector('.profile__edit-button'),
    nameInput = formElement.querySelector('#name-input'),
    descriptionInput = formElement.querySelector('#description-input'),
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

/*Функция заполнение инпутов данными из профиля*/
function fillInputs() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

/*Функция открытия pop-up*/
function openPopUp() {
  popUp.classList.add('pop-up_opened');
  fillInputs();
}

/*Функция закрытия pop-up*/
function closePopUp() {
  popUp.classList.remove('pop-up_opened');
}

/*Функция сохранения данных из формы*/
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopUp();
}

/*Функция создания карточки*/
const getCard = (title, src) => {
  const cardTemplate = document.querySelector('#card_template').content,
      cardsPlace = document.querySelector('.elements__cards'),
      cardClone = cardTemplate.cloneNode(true);

  cardClone.querySelector('.card__title').textContent = title;
  cardClone.querySelector('.card__image').src = src;
  cardClone.querySelector('.card__image').alt = title;

  cardsPlace.prepend(cardClone)
}

/*Функция получения карточек пользователя*/
const getUsersCards = (usersCards) => {
  usersCards.forEach((item) => {
    return getCard(item.title, item.src)
  });
}

getUsersCards(usersCards);

/*Закрытие pop-up по клику*/
editButton.addEventListener('click', openPopUp);

/*Открытие pop-up по клику*/
closeButton.addEventListener('click', closePopUp);

/*Сохранение данных из формы*/
formElement.addEventListener('submit', formSubmitHandler);
