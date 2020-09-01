const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const passwordConfirmation = document.querySelector("#password-confirmation");

function showError(element, spanError) {
  addErrorStyling(element);
  if (element.validity.valueMissing) {
    spanError.textContent = "You need to enter a value here.";
  } else if (element.validity.typeMismatch && element.type === "email") {
    spanError.textContent = "Entered value needs to be a valid email address.";
  } else if (element.validity.tooShort) {
    spanError.textContent = `Value should be at least ${element.minLength} characters, you entered ${element.value.length}.`;
  }
}

function passwordMatch() {
  if (passwordConfirmation.value === password.value) {
    return true;
  } else {
    return false;
  }
}

function addErrorStyling(element) {
  const span = element.nextElementSibling;
  element.classList.add("input-error");
  span.classList.add("active");
}

function removeErrorStyling(element) {
  const span = element.nextElementSibling;
  element.classList.remove("input-error");
  span.classList.remove("active");
}

function validatePassword() {
  const spanError = passwordConfirmation.nextElementSibling;

  spanError.textContent = "Entered value does not match the password.";
  passwordConfirmation.validity.valid = false;
}

for (let i = 0; i < inputs.length; i++) {
  const input = inputs[i];
  input.addEventListener("input", function () {
    const span = this.nextElementSibling;
    if (!this.validity.valid) {
      showError(this, span);
    } else {
      span.innerHTML = "";
      removeErrorStyling(this);
    }
  });
}

passwordConfirmation.addEventListener("input", function () {
  if (!passwordMatch()) {
    validatePassword();
    addErrorStyling(this);
  }
});

form.addEventListener("submit", function (event) {
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].validity.valid) {
      showError(inputs[i], inputs[i].nextElementSibling);
      event.preventDefault();
    }
  }
  if (!passwordMatch()) {
    validatePassword();
    event.preventDefault();
  }
});
