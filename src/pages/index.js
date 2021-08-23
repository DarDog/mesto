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
  avatarFormElement,
  formElementClasses,
  submitButtonEditForm,
  submitButtonAvatarForm,
  submitButtonAddForm,
  nameInput,
  popUpTypeEditSelector,
  popUpTypeImageSelector,
  popUpTypeDeleteSelector,
  popUpTypeAvatarSelector,
  popUpTypeErrorMassageSelector,
  profileDescription,
  profileName,
  profileAvatar,
  popUpTypeAddSelector,
  baseUrl,
  headers,
  errorMassage,
  spinner,
  content
} from '../utils/constants.js'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDeleteForm from "../components/PopupWithDeleteForm.js";
import UserInfo from '../components/UserInfo.js';
import Api from "../components/Api.js";
import PopupWithErrorMassageForm from "../components/PopupWithErrorMassageForm.js";


const api = new Api({
  baseUrl: baseUrl,
  headers: headers
})


Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
    .then(([userData, cards]) => {
      userInfo.setUserInfo(userData);
      cards.reverse()
      rendererCards.renderItems(cards, userData._id)
    })
    .catch((err) => {
      showErrorMassage(err)
    })
    .finally(() => {
      setTimeout(showContent, 1000)
    })

const userInfo = new UserInfo({
  name: profileName,
  description: profileDescription,
  avatar: profileAvatar
});

const rendererCards = new Section({
  renderer: (data, userId) => {
    rendererCards.addItem(createCard(data, userId));
  }
}, cardsContainerSelector);

const createCard = (data, userId) => {
  const card = new Card({
    handleCardClick: handleCardClick,
    handleDeleteClick: handleDeleteClick,
    handleLikeClick: handleLikeClick
  }, cardTemplateSelector);
  return card.generateCard(data, userId)
}

const handleCardClick = (data) => {
  popupWithImage.open(data)
};

const popupWithImage = new PopupWithImage(popUpTypeImageSelector);

const handleDeleteClick = (data, deleteCard) => {
  popupWithDeleteForm.open(data, deleteCard)
}

const popupWithDeleteForm = new PopupWithDeleteForm({
  popupSelector: popUpTypeDeleteSelector,
  formSubmit: (data) => {
    api.deleteCard(data.id)
        .then(() => {
          data.deleteCard()
        })
        .catch((err) => {
          showErrorMassage(err);
        })
  }
});

const handleLikeClick = (data) => {
  return data.isLiked ? api.sendLike(data.cardId).catch((err) => {
    showErrorMassage(err)
  }) : api.deleteLike(data.cardId).catch((err) => {
    showErrorMassage(err)
  })
}

const showErrorMassage = (err) => {
  errorMassage.textContent = err
  popupWithErrorMassage.open()
}

const showContent = () => {
  spinner.classList.add('display-none')
  content.classList.remove('display-none')
}

const popupWithErrorMassage = new PopupWithErrorMassageForm({
  popupSelector: popUpTypeErrorMassageSelector,
  formSubmit: () => {
    popupWithErrorMassage.close();
  }
});

const editFormElementValidator = new FormValidator(formElementClasses, editFormElement);
editFormElementValidator.enableValidation();

const addFormElementValidator = new FormValidator(formElementClasses, addFormElement);
addFormElementValidator.enableValidation();

const avatarFormElementValidator = new FormValidator(formElementClasses, avatarFormElement);
avatarFormElementValidator.enableValidation()

editButton.addEventListener("click", () => {
  editFormElementValidator.resetErrors();
  popupWithEditForm.open();
  fillInputs(userInfo.getUserInfo())
});

const popupWithEditForm = new PopupWithForm({
  popupSelector: popUpTypeEditSelector,
  formSubmit: (data) => {
    submitButtonEditForm.textContent = 'Сохранение...'
    api.sendUserInfo(data)
        .then((data) => {
          userInfo.setUserInfo(data);
          popupWithEditForm.close()
        })
        .catch((err) => {
          showErrorMassage(err);
        })
        .finally(() => {
          submitButtonEditForm.textContent = 'Сохранить'
        })
  }
});

const fillInputs = (userInfo) => {
  nameInput.value = userInfo.name;
  descriptionInput.value = userInfo.description;
};

addButton.addEventListener('click', () => {
  addFormElementValidator.resetErrors();
  popupWithAddForm.open();
});

const popupWithAddForm = new PopupWithForm({
  popupSelector: popUpTypeAddSelector,
  formSubmit: (data) => {
    submitButtonAddForm.textContent = 'Создание...'
    api.sendCard(data)
        .then((data) => {
          rendererCards.addItem(createCard(data));
          popupWithAddForm.close()
        })
        .catch((err) => {
          showErrorMassage(err);
        })
        .finally(() => {
          submitButtonAddForm.textContent = 'Создать'
        })
  }
});

profileAvatar.addEventListener('click', () => {
  avatarFormElementValidator.resetErrors();
  popupWithAvatarEditForm.open();
})

const popupWithAvatarEditForm = new PopupWithForm({
  popupSelector: popUpTypeAvatarSelector,
  formSubmit: (data) => {
    submitButtonAvatarForm.textContent = 'Сохранение...'
    api.sendAvatar(data)
        .then((data) => {
          profileAvatar.src = data.avatar;
          popupWithAvatarEditForm.close()
        })
        .catch((err) => {
          showErrorMassage(err);
        })
        .finally(() => {
          submitButtonAvatarForm.textContent = 'Сохранить'
        })
  }
});