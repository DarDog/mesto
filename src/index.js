//Импорт для webpack
import './pages/index.css'
// Пути к изображениям для webpack
const sakhalinKholmsk = new URL('./images/kholmskoe-vodohranilishe.jpg', import.meta.url),
    japan = new URL('./images/japan.jpg', import.meta.url),
    italy = new URL('./images/italy.jpg', import.meta.url),
    franch = new URL('./images/Franch.jpg', import.meta.url),
    sakhalinChertovMost = new URL('./images/chertov-most.jpg', import.meta.url),
    castleBurgEltz = new URL('./images/Burg Eltz.jpg', import.meta.url);


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


const handleCardClick = (data) => {
  const popupWithImage = new PopupWithImage(popUpTypeImageSelector);
  popupWithImage.open(data)
};

const fillInputs = (userInfo) => {
  nameInput.value = userInfo.name;
  descriptionInput.value = userInfo.description;
};

const fillProfile = (userInfo) => {
  profileName.textContent = userInfo.name;
  profileDescription.textContent = userInfo.description;
};

const editFormSubmitHandler = () => {
  popupWithEditForm.open()
};

const addFormSubmitHandler = () => {
  popupWithAddForm.open()
};


const editFormElementValidator = new FormValidator(formElementClasses, editFormElement);
editFormElementValidator.enableValidation();

const addFormElementValidator = new FormValidator(formElementClasses, addFormElement);
addFormElementValidator.enableValidation();

const rendererCards = new Section({
  items: preparedCards,
  renderer: (item) => {
    const card = new Card(handleCardClick, item, cardTemplateSelector);
    const cardElement = card.generateCard();
    rendererCards.addItem(cardElement);
  }
}, cardsContainerSelector);

const userInfo = new UserInfo({
  name: profileName.textContent,
  description: profileDescription.textContent
});

const popupWithAddForm = new PopupWithForm({
  popupSelector: popUpTypeAddSelector,
  formSubmit: (data) => {
    const card = new Card(handleCardClick, data, cardTemplateSelector);
    const cardElement = card.generateCard();
    rendererCards.addItem(cardElement);
  }
});

const popupWithEditForm = new PopupWithForm({
  popupSelector: popUpTypeEditSelector,
  formSubmit: (data) => {
    userInfo.setUserInfo(data);
    fillProfile(userInfo.getUserInfo());
  }
})


rendererCards.renderItems();

editButton.addEventListener("click", () => {
  popupWithEditForm.open();
  fillInputs(userInfo.getUserInfo())
});

addButton.addEventListener('click', () => {
  popupWithAddForm.open();
});

editFormElement.addEventListener('submit', editFormSubmitHandler);

addFormElement.addEventListener('submit', addFormSubmitHandler);
