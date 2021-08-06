export const popUpTypeImage = document.querySelector('.pop-up_content_image'),
    popUpTypeImageContentImage = popUpTypeImage.querySelector('.pop-up__image'),
    popUpTypeImageContentTitle = popUpTypeImage.querySelector('.pop-up__image-title'),
    popUpTypeEdit = document.querySelector('.pop-up_content_edit'),
    popUpTypeAdd = document.querySelector('.pop-up_content_add'),
    closeButtonEditPopUp = popUpTypeEdit.querySelector('.pop-up__exit-button'),
    closeButtonAddPopUp = popUpTypeAdd.querySelector('.pop-up__exit-button'),
    closeButtonImagePopUp = popUpTypeImage.querySelector('.pop-up__exit-button'),
    editFormElement = document.querySelector('[name=editForm]'),
    addFormElement = document.querySelector('[name=addForm]'),
    editButton = document.querySelector('.profile__edit-button'),
    addButton = document.querySelector('.profile__add-button'),
    nameInput = editFormElement.querySelector('[name=profileName]'),
    descriptionInput = editFormElement.querySelector('[name=profileDescription]'),
    cardNameInput = addFormElement.querySelector('[name=cardName]'),
    cardSrcInput = addFormElement.querySelector('[name=cardLink]'),
    profileName = document.querySelector('.profile__title'),
    profileDescription = document.querySelector('.profile__subtitle'),
    cardsContainerSelector = '.elements__cards',
    cardTemplateSelector = '.card-template';

export const formElementClasses = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disable',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};