export const popUpTypeImageSelector = '.pop-up_content_image',
    popUpTypeEditSelector = '.pop-up_content_edit',
    popUpTypeAddSelector = '.pop-up_content_add',
    editFormElement = document.querySelector('[name=editForm]'),
    addFormElement = document.querySelector('[name=addForm]'),
    editButton = document.querySelector('.profile__edit-button'),
    addButton = document.querySelector('.profile__add-button'),
    nameInput = editFormElement.querySelector('[name=profileName]'),
    descriptionInput = editFormElement.querySelector('[name=profileDescription]'),
    profileName = document.querySelector('.profile__title'),
    profileDescription = document.querySelector('.profile__subtitle'),
    profileAvatar = document.querySelector('.profile__avatar'),
    cardsContainerSelector = '.elements__cards',
    cardTemplateSelector = '.card-template',
    cohort = 'cohort-27',
    token = 'd9890bda-3f75-4adf-b332-5e1f920022f8';

export const formElementClasses = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disable',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};