const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function showError(input, msg) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = msg;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return re.test(String(email).toLowerCase());
  if (re.test(String(input.value.trim()).toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkRequired(arr) {
  arr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

function checkPasswordMatch(input1, input2) {
  if (input1.value === input2.value) {
    showSuccess(input1);
    showSuccess(input2);
  } else {
    showError(input1, "Passwords dont match");
    showError(input2, "Passwords dont match");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
