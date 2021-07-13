/*Показать ошибку*/
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  console.log(inputErrorClass, errorClass)
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

/*Скрыть ошибку*/
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

/*Показывает/скрывает сообщение об ошибке*/
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

/*Навешивает слушателя на инпуты*/
const setEventListener = (formElement,
                          inputSelector,
                          submitButtonSelector,
                          inactiveButtonClass,
                          inputErrorClass,
                          errorClass) => {

  const inputList = Array.from(formElement.querySelectorAll(inputSelector)),
      buttonElement = formElement.querySelector(submitButtonSelector);

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  })

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
}

/*Изменение статуса кнопки в зависимости от состояния инпутов*/
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

/*Проверка валидности инпутов*/
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

/*Запуск валидации*/
const enableValidation = ({formSelector,
                            inputSelector,
                            submitButtonSelector,
                            inactiveButtonClass,
                            inputErrorClass,
                            errorClass}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    setEventListener(formElement,
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        inputErrorClass,
        errorClass)
  });
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disable',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});