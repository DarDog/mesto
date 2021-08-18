//Импорт для webpack
import './index.css'

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
  profileAvatar,
  popUpTypeAddSelector,
  cohort,
  token
} from '../utils/constants.js'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from "../components/Api.js";


const handleCardClick = (data) => {
  popupWithImage.open(data)
};

const createCard = (data) => {
  const card = new Card(handleCardClick, data, cardTemplateSelector);
  return card.generateCard();
}

const addCard = (items) => {
  const rendererCards = new Section({
    items,
    renderer: (data) => {
      rendererCards.addItem(createCard(data));
    }
  }, cardsContainerSelector);
  rendererCards.renderItems();
}

const fillInputs = (userInfo) => {
  nameInput.value = userInfo.name;
  descriptionInput.value = userInfo.description;
};

const fillProfile = (userInfo) => {
  profileName.textContent = userInfo.name;
  profileDescription.textContent = userInfo.description;
  profileAvatar.src = userInfo.avatar;
};

const editFormSubmitHandler = () => {
  popupWithEditForm.open()
};

const addFormSubmitHandler = () => {
  popupWithAddForm.open()
};


const api = new Api({
  cohort: cohort,
  token: token
})

const popupWithImage = new PopupWithImage(popUpTypeImageSelector);

const editFormElementValidator = new FormValidator(formElementClasses, editFormElement);
editFormElementValidator.enableValidation();

const addFormElementValidator = new FormValidator(formElementClasses, addFormElement);
addFormElementValidator.enableValidation();

const userInfo = new UserInfo({
  name: profileName.textContent,
  description: profileDescription.textContent
});

const popupWithAddForm = new PopupWithForm({
  popupSelector: popUpTypeAddSelector,
  formSubmit: (data) => {
    api.sendCard(data)
        .then((data) => {
          addCard([data])
        })
  }
});

const popupWithEditForm = new PopupWithForm({
  popupSelector: popUpTypeEditSelector,
  formSubmit: (data) => {
    api.sendUserInfo(data)
        .then((data) => {
          userInfo.setUserInfo(data);
          fillProfile(userInfo.getUserInfo())
        })
        .catch((err) => {
          console.log(err)
        })
  }
})


api.getUserInfo()
    .then((data) => {
      userInfo.setUserInfo(data);
      userInfo.setUserAvatar(data.avatar);
      fillProfile(userInfo.getUserInfo())
    })
    .catch((err) => {
      console.log(err)
    })

api.getInitialCards()
    .then((data) => {
      data.reverse()
      addCard(data)
    })
    .catch((err) => {
      console.log(err)
    })


editButton.addEventListener("click", () => {
  editFormElementValidator.resetErrors();
  popupWithEditForm.open();
  fillInputs(userInfo.getUserInfo())
});

addButton.addEventListener('click', () => {
  addFormElementValidator.resetErrors();
  popupWithAddForm.open();
});

editFormElement.addEventListener('submit', editFormSubmitHandler);

addFormElement.addEventListener('submit', addFormSubmitHandler);
