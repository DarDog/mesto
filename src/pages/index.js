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
  cohort,
  token,
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
  cohort: cohort,
  token: token
})

Promise.all([
    api.getUserInfo(),
    api.getInitialCards()
])
    .then((data) => {
      userInfo.setUserInfo(data[0]);
      data[1].reverse()
      rendererCards.renderItems(data[1])
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
  renderer: (data) => {
    rendererCards.addItem(createCard(data));
  }
}, cardsContainerSelector);

const createCard = (data) => {
  const card = new Card({
    handleCardClick: handleCardClick,
    handleDeleteClick: handleDeleteClick,
    handleLikeClick: handleLikeClick
  }, cardTemplateSelector);
  return card.generateCard(data)
}

const handleCardClick = (data) => {
  popupWithImage.open(data)
};

const popupWithImage = new PopupWithImage(popUpTypeImageSelector);

const handleDeleteClick = (data) => {
  popupWithDeleteForm.open(data)
}

const popupWithDeleteForm = new PopupWithDeleteForm({
  popupSelector: popUpTypeDeleteSelector,
  formSubmit: (data) => {
    api.deleteCard(data.id)
        .then(() => {
          data.card.remove()
        })
        .catch((err) => {
          showErrorMassage(err);
        })
  }
});

const handleLikeClick = (data, changeStateLikeButton, setLikesCount) => {
  if (data.isLiked) {
    api.sendLike(data.cardId)
        .then((data) => {
          changeStateLikeButton()
          setLikesCount(data.likes.length)
        })
        .catch((err) => {
          showErrorMassage(err);
        })
  } else {
    api.deleteLike(data.cardId)
        .then((data) => {
          changeStateLikeButton()
          setLikesCount(data.likes.length)
        })
        .catch((err) => {
          showErrorMassage(err);
        })
  }
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
          rendererCards.addItem([data]);
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