let firstnameError = document.getElementById("firstname-error");
let lastnameError = document.getElementById("lastname-error");
let emailError = document.getElementById("email-error");
let queryError = document.getElementById("query-error");
let messageError = document.getElementById("message-error");
let checkError = document.getElementById("check-error");

function showError(input, errorElement, message) {
  errorElement.innerHTML = message;
  errorElement.style.display = "block";
  input.style.border = "1px solid red";
}

function clearError(input, errorElement) {
  errorElement.style.display = "none";
  input.style.border = "1px solid var(--grey-light)";
}

function validateName(inputId, errorElement) {
  let input = document.getElementById(inputId);
  let value = input.value.trim();

  if (!value) {
    showError(input, errorElement, "This field is required");
    return false;
  } else if (!/^[a-zA-Z ]+$/.test(value)) {
    showError(input, errorElement, "Name should contain letters only");
    return false;
  } else {
    clearError(input, errorElement);
    return true;
  }
}

function validateEmail() {
  let email = document.getElementById("email");
  let value = email.value.trim();

  if (!value) {
    showError(email, emailError, "This field is required");
    return false;
  } else if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(value)) {
    showError(email, emailError, "Invalid email address");
    return false;
  } else {
    clearError(email, emailError);
    return true;
  }
}

function validateQuery() {
  let radios = document.querySelectorAll('input[type="radio"]');
  let selected = Array.from(radios).some((radio) => radio.checked);

  if (!selected) {
    queryError.style.display = "block";
    return false;
  } else {
    queryError.style.display = "none";
    return true;
  }
}

function validateMessage() {
  let message = document.getElementById("message");

  if (!message.value.trim()) {
    showError(message, messageError, "This field is required");
    return false;
  } else {
    clearError(message, messageError);
    return true;
  }
}

function validateCheck() {
  let check = document.getElementById("check");

  if (!check.checked) {
    checkError.style.display = "block";
    return false;
  } else {
    checkError.style.display = "none";
    return true;
  }
}

let alertBox = Swal.mixin({
  customClass: {
    title: "font-size:16px font-weight:700",
  },
});

let form = document.querySelector("form");

function validateForm() {
  let valid =
    validateName("firstname", firstnameError) &&
    validateName("lastname", lastnameError) &&
    validateEmail() &&
    validateQuery() &&
    validateMessage() &&
    validateCheck();

  if (!valid) {
    console.log("form not submitted");
    return;
  }

  alertBox.fire({
    toast: true,
    position: "top",
    title:
      "<i><img src='./assets/images/icon-success-check.svg' /></i> Message Sent!",
    text: "Thanks for completing the form. We'll be in touch soon!",
    color: "#fff",
    background: "hsl(187, 24%, 22%)",
    showConfirmButton: false,
    timer: 5000,
  });

  form.reset();
  console.log("form submitted");
}
