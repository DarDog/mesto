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

api.getUserInfo()
    .then((data) => {
      userInfo.setUserInfo(data);
      fillProfile(userInfo.getUserInfo())
    })
    .catch((err) => {
      showErrorMassage(err);
    })

const userInfo = new UserInfo({
  name: profileName.textContent,
  description: profileDescription.textContent
});

const fillProfile = (userInfo) => {
  profileName.textContent = userInfo.name;
  profileDescription.textContent = userInfo.description;
  profileAvatar.src = userInfo.avatar;
};

const showErrorMassage = (err) => {
  errorMassage.textContent = err
  popupWithErrorMassage.open()
}

const popupWithErrorMassage = new PopupWithErrorMassageForm({
  popupSelector: popUpTypeErrorMassageSelector,
  formSubmit: () => {
    popupWithErrorMassage.close();
  }
});

api.getInitialCards()
    .then((data) => {
      data.reverse()
      addCard(data)
      setTimeout(showContent, 1000)
    })
    .catch((err) => {
      showErrorMassage(err);
    })

const showContent = () => {
  spinner.classList.add('display-none')
  content.classList.remove('display-none')
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

const createCard = (data) => {
  const card = new Card({
    handleCardClick: handleCardClick,
    handleDeleteClick: handleDeleteClick,
    handleLikeClick: handleLikeClick
  }, data, cardTemplateSelector);
  return card.generateCard();
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
    data.card.remove()
    api.deleteCard(data.id)
        .catch((err) => {
          showErrorMassage(err);
        })
  }
});

const handleLikeClick = ({cardId, likeCount, isLiked}) => {
  if (isLiked) {
    api.sendLike(cardId)
        .then((data) => {
          likeCount.textContent = data.likes.length
        })
        .catch((err) => {
          showErrorMassage(err);
        })
  } else {
    api.deleteLike(cardId)
        .then((data) => {
          likeCount.textContent = data.likes.length
        })
        .catch((err) => {
          showErrorMassage(err);
        })
  }
}

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
          fillProfile(userInfo.getUserInfo());
          popupWithEditForm.close()
          submitButtonEditForm.textContent = 'Сохранить'
        })
        .catch((err) => {
          showErrorMassage(err);
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
          addCard([data]);
          popupWithAddForm.close()
          submitButtonAddForm.textContent = 'Создать'
        })
        .catch((err) => {
          showErrorMassage(err);
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
          submitButtonAvatarForm.textContent = 'Сохранить'
        })
        .catch((err) => {
          showErrorMassage(err);
        })
  }
});