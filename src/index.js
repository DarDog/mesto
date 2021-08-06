import './pages/index.css'

import { formElementClasses,
  editFormElement,
  addFormElement,
  cardTemplateSelector,
  cardsContainerSelector,
  nameInput,
  profileName,
  descriptionInput,
  profileDescription,
  popUpTypeEdit,
  cardNameInput,
  cardSrcInput,
  popUpTypeAdd,
  editButton,
  addButton,
  closeButtonEditPopUp,
  closeButtonAddPopUp,
  closeButtonImagePopUp,
  popUpTypeImage} from './utils/constants.js'
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';

// Пути к изображениям для webpack
const sakhalinKholmsk = new URL('./images/kholmskoe-vodohranilishe.jpg', import.meta.url),
    japan = new URL('./images/japan.jpg', import.meta.url),
    italy = new URL('./images/italy.jpg', import.meta.url),
    franch = new URL('./images/Franch.jpg', import.meta.url),
    sakhalinChertovMost = new URL('./images/chertov-most.jpg', import.meta.url),
    castleBurgEltz = new URL('./images/Burg Eltz.jpg', import.meta.url);

export const preparedCards = [
  {
    title: 'Сахалин Холмск',
    src: sakhalinKholmsk
  },
  {
    title: 'Япония',
    src: japan
  },
  {
    title: 'Италия',
    src: italy
  },
  {
    title: 'Франция',
    src: franch
  },
  {
    title: 'Сахалин Чертов мост',
    src: sakhalinChertovMost
  },
  {
    title: 'Замок Burg Eltz',
    src: castleBurgEltz
  },
];

const editFormElementValidator = new FormValidator(formElementClasses, editFormElement);
editFormElementValidator.enableValidation();

const addFormElementValidator = new FormValidator(formElementClasses, addFormElement);
addFormElementValidator.enableValidation();

const prependCardsAdd = new Section({
  items: preparedCards,
  renderer: (item) => {
    const card = new Card(item, cardTemplateSelector);
    const cardElement = card.generateCard();
    prependCardsAdd.addItem(cardElement);
  }
}, cardsContainerSelector);

prependCardsAdd.renderItems();

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
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopUp(popUpTypeEdit);
}

const addFormSubmitHandler = (evt) => {
  const cardData = [{
        title: cardNameInput.value,
        src: cardSrcInput.value
      }]
  evt.preventDefault();
  const cardsAdd = new Section({
    items: cardData,
    renderer: (item) => {
      const card = new Card(item, cardTemplateSelector);
      const cardElement = card.generateCard();
      cardsAdd.addItem(cardElement);
    }
  }, cardsContainerSelector);
  cardsAdd.renderItems()
  addFormElement.reset();
  addFormElementValidator.toggleButtonState();
  closePopUp(popUpTypeAdd);
}

fillInputs();

editButton.addEventListener("click", () => {
  openPopUp(popUpTypeEdit);
  editFormElementValidator.toggleButtonState()
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
