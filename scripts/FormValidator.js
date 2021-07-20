class FormValidator {
  constructor(data, form) {
    this._formElement = form;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
  }

  _showInputElement(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputElement(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputElement(inputElement);
    } else {
      this._hideInputElement(inputElement)
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)),
        buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement)
      });
    });

    this._toggleButtonState(inputList, buttonElement)
  }

  enableValidation() {
    this._setEventListeners()
  }
}

const formElementClasses = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disable',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

const formList = Array.from(document.querySelectorAll('.form'))

formList.forEach((formElement) => {
  const formValidator = new FormValidator(formElementClasses, formElement);
      formValidator.enableValidation();
})