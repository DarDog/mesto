let popUp = document.querySelector('.pop-up'),
    closeButton = popUp.querySelector('.pop-up__exit-button'),
    editButton = document.querySelector('.profile__edit-button');

/*Функция закрытия pop-up*/
function closePopUp() {
  popUp.classList.remove('pop-up_opened')
}

/*Функция открытия pop-up*/
function openPopUp() {
  popUp.classList.add('pop-up_opened')
}

/*Закрытие pop-up по клику*/
editButton.addEventListener('click', openPopUp);

/*Открытие pop-up по клику*/
closeButton.addEventListener('click', closePopUp);
