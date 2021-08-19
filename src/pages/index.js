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
  nameInput,
  popUpTypeEditSelector,
  popUpTypeImageSelector,
  popUpTypeDeleteSelector,
  popUpTypeAvatarSelector,
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
import PopupWithDeleteForm from "../components/PopupWithDeleteForm.js";
import UserInfo from '../components/UserInfo.js';
import Api from "../components/Api.js";


const handleCardClick = (data) => {
  popupWithImage.open(data)
};

const handleDeleteClick = (data) => {
  popupWithDeleteForm.open(data)
}

const handleLikeClick = ({cardId, likeCount, isLiked}) => {
  if (isLiked) {
    api.sendLike(cardId)
        .then((data) => {
          likeCount.textContent = data.likes.length
        })
        .catch((err) => {
          console.log(err)
        })
  } else {
    api.deleteLike(cardId)
        .then((data) => {
          likeCount.textContent = data.likes.length
        })
        .catch((err) => {
          console.log(err)
        })
  }
}

const createCard = (data) => {
  const card = new Card({
    handleCardClick: handleCardClick,
    handleDeleteClick: handleDeleteClick,
    handleLikeClick: handleLikeClick
  }, data, cardTemplateSelector);
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


const api = new Api({
  cohort: cohort,
  token: token
})

const popupWithImage = new PopupWithImage(popUpTypeImageSelector);

const editFormElementValidator = new FormValidator(formElementClasses, editFormElement);
editFormElementValidator.enableValidation();

const addFormElementValidator = new FormValidator(formElementClasses, addFormElement);
addFormElementValidator.enableValidation();

const avatarFormElementValidator = new FormValidator(formElementClasses, avatarFormElement);
avatarFormElementValidator.enableValidation()

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
});

const popupWithAvatarEditForm = new PopupWithForm({
  popupSelector: popUpTypeAvatarSelector,
  formSubmit: (data) => {
    api.sendAvatar(data)
        .then((data) => {
          profileAvatar.src = data.avatar
        })
  }
});

const popupWithDeleteForm = new PopupWithDeleteForm({
  popupSelector: popUpTypeDeleteSelector,
  formSubmit: (data) => {
    data.card.remove()
    api.deleteCard(data.id)
        .catch((err) => {
          console.log(err)
        })
  }
});


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

profileAvatar.addEventListener('click', () => {
  avatarFormElementValidator.resetErrors();
  popupWithAvatarEditForm.open();
})