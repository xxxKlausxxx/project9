export default class FormValidator {

  constructor (form) {
      this.form = form;
  }


  setSubmitButtonState(isValidForm) {
    const button = this.form.querySelector("button");
    if (isValidForm) {
      button.classList.add('popup__button_active');
    } else {
      button.classList.remove('popup__button_active');
    }
  }

  setEventListeners() {
    const inputs = Array.from(this.form.querySelectorAll("input"));
    const button = this.form.querySelector("button");

    if (this.form.classList.contains('popup__profile')){
        inputs.forEach(elem => {
      elem.addEventListener("input", () => this.validate(inputs, button));
      });
    }

    if (this.form.classList.contains('popup__info')) {
      this.form.addEventListener('input', () => {
        let isValidForm = true;
        inputs.forEach((elem) => {
            if (!this.checkInputValidity(elem)) isValidForm = false;
            this.setSubmitButtonState(isValidForm)
          });
        })
      }
  }

  validate(inputs, button) {
    const res = inputs.reduce((acc, input) => this.checkInputValidity(input) && acc, true);
    this.setSubmitButtonState(res, button);
  }

  activateError(element) {
    element.nextElementSibling.classList.remove('error-massage_hidden');
    element.setAttribute("style", "margin-bottom:0;");
  }

  resetError(element) {
    element.removeAttribute("style");
    element.nextElementSibling.textContent = "";
    element.nextElementSibling.classList.add("error-massage_hidden");
  }

  checkInputValidity(element) {
    if (this.form.classList.contains('popup__profile')) {

      const error = element.nextElementSibling;
      const errorMessages = {
          valueMissing: 'Это обязательное поле',
          tooShort: 'Должно быть от 2 до 30 символов',
          typeMismatch: 'Здесь должна быть ссылка'
      };

      if (!element.value) {
        this.activateError(element);
        error.textContent = errorMessages.valueMissing;
        return false;
      }
      if (element.value.length < 2 || element.value.length > 30) {
        this.activateError(element);
        error.textContent = errorMessages.tooShort;
        return false;
      }
      this.resetError(element);
      return true;
    }

    else {if (!element.checkValidity()) {
      return false;
    }
         else {
      return true;
    }};
  }

}
