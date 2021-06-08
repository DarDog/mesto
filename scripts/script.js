let popUp = document.querySelector('.pop-up'),
    formElement = popUp.querySelector('.pop-up__container'),
    closeButton = formElement.querySelector('.pop-up__exit-button'),
    editButton = document.querySelector('.profile__edit-button'),
    nameInput = formElement.querySelector('#name-input'),
    descriptionInput = formElement.querySelector('#description-input'),
    profileName = document.querySelector('.profile__title'),
    profileDescription = document.querySelector('.profile__subtitle');

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

/*Закрытие pop-up по клику*/
editButton.addEventListener('click', openPopUp);

/*Открытие pop-up по клику*/
closeButton.addEventListener('click', closePopUp);

/*Сохранение данных из формы*/
formElement.addEventListener('submit', formSubmitHandler);
