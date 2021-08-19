export const popUpTypeImageSelector = '.pop-up_content_image',
    popUpTypeEditSelector = '.pop-up_content_edit',
    popUpTypeAddSelector = '.pop-up_content_add',
    popUpTypeDeleteSelector = '.pop-up_content_delete',
    popUpTypeAvatarSelector = '.pop-up_content_avatar',
    popUpTypeErrorMassageSelector = '.pop-up_content_error-massage',
    errorMassage = document.querySelector('.error_massage'),
    editFormElement = document.querySelector('[name=editForm]'),
    addFormElement = document.querySelector('[name=addForm]'),
    avatarFormElement = document.querySelector('[name=avatarForm]'),
    editButton = document.querySelector('.profile__edit-button'),
    addButton = document.querySelector('.profile__add-button'),
    submitButtonEditForm = editFormElement.querySelector('.form__submit-button'),
    submitButtonAvatarForm = avatarFormElement.querySelector('.form__submit-button'),
    submitButtonAddForm = addFormElement.querySelector('.form__submit-button'),
    nameInput = editFormElement.querySelector('[name=name]'),
    descriptionInput = editFormElement.querySelector('[name=about]'),
    profileName = document.querySelector('.profile__title'),
    profileDescription = document.querySelector('.profile__subtitle'),
    profileAvatar = document.querySelector('.profile__avatar'),
    cardsContainerSelector = '.elements__cards',
    cardTemplateSelector = '.card-template',
    spinner = document.querySelector('.spinner'),
    content = document.querySelector('.main'),
    baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-27',
    headers = {
      authorization: 'd9890bda-3f75-4adf-b332-5e1f920022f8',
      'Content-Type': 'application/json'
    }

export const formElementClasses = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disable',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};