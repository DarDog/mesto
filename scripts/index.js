import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";

export const popUpTypeImage = document.querySelector('.pop-up_content_image'),
    popUpTypeImageContentImage = popUpTypeImage.querySelector('.pop-up__image'),
    popUpTypeImageContentTitle = popUpTypeImage.querySelector('.pop-up__image-title');

const popUpTypeEdit = document.querySelector('.pop-up_content_edit'),
    popUpTypeAdd = document.querySelector('.pop-up_content_add'),
    closeButtonEditPopUp = popUpTypeEdit.querySelector('.pop-up__exit-button'),
    closeButtonAddPopUp = popUpTypeAdd.querySelector('.pop-up__exit-button'),
    closeButtonImagePopUp = popUpTypeImage.querySelector('.pop-up__exit-button'),
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
    cardsContainer = document.querySelector('.elements__cards');

//Подготовленные данные
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
//Селекторы формы
const formElementClasses = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disable',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};
//Массив форм
const formList = Array.from(document.querySelectorAll('.form'));

//Валидация форм
formList.forEach((formElement) => {
  const formValidator = new FormValidator(formElementClasses, formElement);
  formValidator.enableValidation();
});

const addCard = (data, template, place) => {
  const card = new Card(data, template),
      cardElement = card.generateCard();

  place.prepend(cardElement)
}

//Создание подготовленных карточек
preparedCards.forEach((el) => {
  addCard(el, '#card_template', cardsContainer)
});

const fillInputs = () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

export  const openPopUp = (popUp) => {
  popUp.classList.add('pop-up_opened');

  document.addEventListener('keydown', closePopUpByClickAtEsc);
  popUp.addEventListener('click', closePopUpByClickAtOverlay);
}

const closePopUp = (popUp) => {
  popUp.classList.remove('pop-up_opened');

  document.removeEventListener('keydown', closePopUpByClickAtEsc);
  popUp.removeEventListener('click', closePopUpByClickAtOverlay);
}

/*Методы закрытия попапов*/
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

/*Функции отправки форм*/
const editFormSubmitHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopUp(popUpTypeEdit);
}

const addFormSubmitHandler = (evt) => {
  const createButton = popUpTypeAdd.querySelector('.form__submit-button'),
      cardData = {
        title: cardNameInput.value,
        src: cardSrcInput.value
      }
  evt.preventDefault();
  addCard(cardData, '#card_template', cardsContainer);
  addFormElement.reset()
  createButton.classList.add('form__submit-button_disable')
  closePopUp(popUpTypeAdd);
}
/**/
fillInputs();

editButton.addEventListener("click", () => {
  openPopUp(popUpTypeEdit);
});
addButton.addEventListener('click', () => {
  openPopUp(popUpTypeAdd);
});

closeButtonEditPopUp.addEventListener('click', () => {
  closePopUp(popUpTypeEdit)
})
closeButtonAddPopUp.addEventListener('click', () => {
  closePopUp(popUpTypeAdd)
})
closeButtonImagePopUp.addEventListener('click', () => {
  closePopUp(popUpTypeImage)
})

editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit',addFormSubmitHandler);
