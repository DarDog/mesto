let popUp = document.querySelector('.pop-up'),
    closeButton = popUp.querySelector('.pop-up__exit-button'),
    editButton = document.querySelector('.profile__edit-button'),
    nameInput = document.querySelector('#name-input'),
    descriptionInput = document.querySelector('#description-input');

/*Функция заполнение инпутов данными из профиля*/
function fillInputs() {
  nameInput.value = document.querySelector('.profile__title').textContent;
  descriptionInput.value = document.querySelector('.profile__subtitle').textContent;
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

/*Закрытие pop-up по клику*/
editButton.addEventListener('click', openPopUp);

/*Открытие pop-up по клику*/
closeButton.addEventListener('click', closePopUp);
