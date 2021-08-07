import './pages/index.css'

import {
  addButton,
  addFormElement,
  cardsContainerSelector,
  cardTemplateSelector,
  descriptionInput,
  editButton,
  editFormElement,
  formElementClasses,
  nameInput,
  popUpTypeEdit,
  popUpTypeEditSelector,
  popUpTypeImageSelector,
  profileDescription,
  profileName,
  popUpTypeAddSelector
} from './utils/constants.js'
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js'

// Пути к изображениям для webpack
const sakhalinKholmsk = new URL('./images/kholmskoe-vodohranilishe.jpg', import.meta.url),
    japan = new URL('./images/japan.jpg', import.meta.url),
    italy = new URL('./images/italy.jpg', import.meta.url),
    franch = new URL('./images/Franch.jpg', import.meta.url),
    sakhalinChertovMost = new URL('./images/chertov-most.jpg', import.meta.url),
    castleBurgEltz = new URL('./images/Burg Eltz.jpg', import.meta.url);

export const preparedCards = [
  {
    cardName: 'Сахалин Холмск',
    cardLink: sakhalinKholmsk
  },
  {
    cardName: 'Япония',
    cardLink: japan
  },
  {
    cardName: 'Италия',
    cardLink: italy
  },
  {
    cardName: 'Франция',
    cardLink: franch
  },
  {
    cardName: 'Сахалин Чертов мост',
    cardLink: sakhalinChertovMost
  },
  {
    cardName: 'Замок Burg Eltz',
    cardLink: castleBurgEltz
  },
];

const editFormElementValidator = new FormValidator(formElementClasses, editFormElement);
editFormElementValidator.enableValidation();

const addFormElementValidator = new FormValidator(formElementClasses, addFormElement);
addFormElementValidator.enableValidation();

const handleCardClick = (data) => {
  const popupWithImage = new PopupWithImage(popUpTypeImageSelector);
  popupWithImage.open(data)
}

const prependCardsAdd = new Section({
  items: preparedCards,
  renderer: (item) => {
    const card = new Card(handleCardClick, item, cardTemplateSelector);
    const cardElement = card.generateCard();
    prependCardsAdd.addItem(cardElement);
  }
}, cardsContainerSelector);

prependCardsAdd.renderItems();

const fillInputs = (userInfo) => {
  nameInput.value = userInfo.name;
  descriptionInput.value = userInfo.description;
}

export const openPopUp = (popUp) => {
  popUp.classList.add('pop-up_opened');

  document.addEventListener('keydown', closePopUpByClickAtEsc);
  popUp.addEventListener('click', closePopUpByClickAtOverlay);
}

const closePopUp = (popUp) => {
  popUp.classList.remove('pop-up_opened');

  document.removeEventListener('keydown', closePopUpByClickAtEsc);
  popUp.removeEventListener('click', closePopUpByClickAtOverlay);
}


const closePopUpByClickAtOverlay = (evt) => {
  const isOverlay = evt.target.classList.contains('pop-up'),
      popUp = evt.target;
  if (isOverlay) {
    closePopUp(popUp);
  }
}

const closePopUpByClickAtEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popUp = document.querySelector('.pop-up_opened')
    closePopUp(popUp);
  }
}

const editFormSubmitHandler = (evt) => {
  popupWithEditForm.open()
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopUp(popUpTypeEdit);
}

const addFormSubmitHandler = () => {
  popupWithAddForm.open()
}

const popupWithAddForm = new PopupWithForm({
  popupSelector: popUpTypeAddSelector,
  formSubmit: (data) => {
    const card = new Card(handleCardClick, data, cardTemplateSelector);
    const cardElement = card.generateCard();
    prependCardsAdd.addItem(cardElement);
  }
});



const userInfo = new UserInfo({
  name:profileName.textContent,
  description:profileDescription.textContent});

const popupWithEditForm = new PopupWithForm({
  popupSelector: popUpTypeEditSelector,
  formSubmit: (data) => {
    userInfo.setUserInfo(data)
  }
})

editButton.addEventListener("click", () => {
  popupWithEditForm.open();
  fillInputs(userInfo.getUserInfo())
});
addButton.addEventListener('click', () => {
  popupWithAddForm.open();
});

editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addFormSubmitHandler);
