setAdminInLocalStorage();

const sendUpFormButton = document.getElementById("sign-up-send");
const signUpButton = document.getElementById("sign-up-button");
const signInButton = document.getElementById("sign-in-button");
const signUp = document.querySelector(".sign-up");
const signIn = document.querySelector(".sign-in");
const signUpForm = document.querySelector(".sign-up form");
const signInForm = document.querySelector(".sign-in form");

const visiblePasswordButton = document.getElementById(
  "visible-password-button"
);
const generatePasswordButton = document.getElementById(
  "generate-password-button"
);
const passwordInput = document.getElementById("create-password");
const passwordConfirm = document.getElementById("confirm-password");

var usersArray = JSON.parse(localStorage.getItem("usersData"));
const generateLoginButton = document.getElementById("generate-login-button");
const loginInput = document.getElementById("create-login");
let ammountOfGeneratedLigins = 0;
let modal = false;

const sendInFormButton = document.getElementById("sign-in-send");
const loginInLabel = document.getElementById("login-in-label");
const passwordInLabel = document.getElementById("password-in-label");

const phoneLabel = document.getElementById("phone-label");
const emailLabel = document.getElementById("email-label");
const birthdayLabel = document.getElementById("birthday-label");
const nameLabel = document.getElementById("name-label");
const surnameLabel = document.getElementById("surname-label");
const loginUpLabel = document.getElementById("login-up-label");
const passwordUpLabel = document.getElementById("password-up-label");
const confirmPasswordLabel = document.getElementById("confirm-password-label");
const termsOfUseLabel = document.getElementById("terms-of-use-label");

signUpButton.addEventListener("click", function () {
  signIn.classList.add("hidden");
  signUp.classList.remove("hidden");
});
signInButton.addEventListener("click", function () {
  signUp.classList.add("hidden");
  signIn.classList.remove("hidden");
});
async function getUsersData() {
  try {
    const data = localStorage.getItem("usersData");
    if (!data) {
      throw new Error("No data found in localStorage");
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
function checkMatches(item, items) {
  for (let i = 0; i < items.length; i++) {
    if (items[i] === item) {
      return true;
    }
  }
  return false;
}
async function setAdminInLocalStorage() {
  let usersData = await getUsersData();
  if (usersData != null || usersData != undefined) {
    return;
  }
  const admin = {
    role: "admin",
    login: "admin",
    password: 1234,
  };
  usersData = [admin];
  const jsonData = JSON.stringify(usersData);
  localStorage.setItem("usersData", jsonData);
}
signInForm.addEventListener("input", async function () {
  const signInData = new FormData(signInForm);
  const login = signInData.get("login");
  const password = signInData.get("password");

  if (login == "") {
    loginInLabel.className = "msg-empty";
    sendInFormButton.className = "hidden";
    sendInFormButton.type = "button";
    return;
  } else {
    loginInLabel.classList.remove("msg-empty");
  }
  if (password == "") {
    passwordInLabel.className = "msg-empty";
    sendInFormButton.className = "hidden";
    sendInFormButton.type = "button";
    return;
  } else {
    passwordInLabel.classList.remove("msg-empty");
  }
  sendInFormButton.classList.remove("hidden");
  sendInFormButton.type = "submit";
});
signInForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const signInData = new FormData(signInForm);
  const login = signInData.get("login");
  const password = signInData.get("password");

  const usersData = await getUsersData();
  let roles = [];
  let logins = [];
  let passwords = [];

  usersData.forEach((item) => {
    roles.push(item.role);
    logins.push(item.login);
    passwords.push(item.password);
  });
  let numberOfUser = -1;

  for (let i = 0; i < logins.length; i++) {
    if (
      logins[i] === login &&
      passwords[i].toString() === password.toString()
    ) {
      numberOfUser = i;
      break;
    }
  }
  if (numberOfUser != -1) {
    alert("♥ ->" + roles[numberOfUser]);
    localStorage.setItem("currUser", roles[numberOfUser]);
    signInForm.reset();
    localStorage.setItem(
      "currUserId",
      usersArray.findIndex(
        (x) => x.login == login && x.password == password.toString()
      )
    );
    window.location.href = "../../areg/index.html";
  } else {
    alert("×××");
  }
});
signUpForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const signUpData = new FormData(signUpForm);
  const usersData = await getUsersData();

  const newUser = {
    role: "user",
    login: signUpData.get("create-login"),
    password: signUpData.get("create-password"),
    name: signUpData.get("name"),
    surname: signUpData.get("surname"),
    patronymic: signUpData.get("patronymic") ?? "*",
    phone: signUpData.get("phone"),
    eMail: signUpData.get("email"),
    birthDay: signUpData.get("birth-date"),
  };

  usersData.push(newUser);
  const jsonData = JSON.stringify(usersData);
  localStorage.setItem("usersData", jsonData);
  signUpForm.reset();
  window.location.reload();
});
generatePasswordButton.addEventListener("click", function () {
  let password = "!";
  const alphabet = "abcdefghijklmnopqrstuvwxyz!?$%#@*()&+-=_";
  let ammountOfSmth = Math.floor(Math.random() * 4);
  for (let j = 0; password == undefined || password.length < 12; j++) {
    for (let i = 0; i < ammountOfSmth; i++) {
      if (j % 2 === 0) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        const randomLetter = alphabet[randomIndex];
        const randomCase = Math.random() < 0.5 ? 0 : 1;

        if (randomCase === 1) {
          password += randomLetter.toUpperCase();
        } else {
          password += randomLetter;
        }
      } else {
        const randomNumber = Math.floor(Math.random() * 10);
        password += randomNumber;
      }
    }
    ammountOfSmth = Math.floor(Math.random() * 4);
  }
  passwordInput.value = password;
  passwordConfirm.value = password;
  checkValidUpForm();
});
visiblePasswordButton.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passwordConfirm.type = "text";
  } else {
    passwordInput.type = "password";
    passwordConfirm.type = "password";
  }
});
generateLoginButton.addEventListener("click", function () {
  if (ammountOfGeneratedLigins < 10) {
    const adjectives = ["Wonderful", "Cute", "Awesome", "Beutiful", "Handsome"];
    const nouns = ["Dude", "Guy", "Human", "Android", "Man", "Robot"];

    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    loginInput.value = randomAdjective + randomNoun;
    ammountOfGeneratedLigins++;
    checkValidUpForm();
  } else {
    alert("×");
  }
});
function setSubmitActive() {
  sendUpFormButton.classList.remove("hidden");
  sendUpFormButton.type = "submit";
}
function disableSubmit() {
  sendUpFormButton.className = "hidden";
  sendUpFormButton.type = "button";
}
async function checkValidUpForm() {
  const signUpData = new FormData(signUpForm);
  const phone = signUpData.get("phone");
  const eMail = signUpData.get("email");
  const name = signUpData.get("name");
  const surname = signUpData.get("surname");
  const login = signUpData.get("create-login");
  const birthDay = signUpData.get("birth-date");
  const password = signUpData.get("create-password");
  const confirmPassword = signUpData.get("confirm-password");
  const termsOfUse = signUpData.get("terms-of-use");

  const usersData = await getUsersData();

  if (!phone.startsWith("+")) {
    phoneLabel.className = "msg-phone-plus";
    disableSubmit();
    return;
  } else {
    phoneLabel.classList.remove("msg-phone-plus");
  }
  if (phone.toString().length != 13) {
    phoneLabel.className = "msg-phone";
    disableSubmit();
    return;
  } else {
    phoneLabel.classList.remove("msg-phone");
  }
  if (!phone.startsWith("+375")) {
    phoneLabel.className = "msg-phone-bel";
    disableSubmit();
    return;
  } else {
    phoneLabel.classList.remove("msg-phone-bel");
  }
  if (eMail == "") {
    emailLabel.className = "msg-empty";
    disableSubmit();
    return;
  } else {
    emailLabel.classList.remove("msg-empty");
  }
  if (birthDay == "") {
    birthdayLabel.className = "msg-empty";
    disableSubmit();
    return;
  } else {
    birthdayLabel.classList.remove("msg-empty");
  }
  let today = new Date();
  today.setFullYear(today.getFullYear() - 16);
  const birthDayDate = new Date(birthDay);
  if (birthDayDate > today) {
    birthdayLabel.className = "msg-less16";
    disableSubmit();
    return;
  } else {
    birthdayLabel.classList.remove("msg-less16");
  }
  if (name == "") {
    nameLabel.className = "msg-empty";
    disableSubmit();
    return;
  } else {
    nameLabel.classList.remove("msg-empty");
  }
  if (name.toString().length < 3) {
    nameLabel.className = "msg-name-more3";
    disableSubmit();
    return;
  } else {
    nameLabel.classList.remove("msg-name-more3");
  }
  if (surname == "") {
    surnameLabel.className = "msg-empty";
    disableSubmit();
    return;
  } else {
    surnameLabel.classList.remove("msg-empty");
  }
  if (surname.toString().length < 3) {
    surnameLabel.className = "msg-name-more3";
    disableSubmit();
    return;
  } else {
    surnameLabel.classList.remove("msg-name-more3");
  }
  if (login == "") {
    loginUpLabel.className = "msg-empty";
    disableSubmit();
    return;
  } else {
    loginUpLabel.classList.remove("msg-empty");
  }
  let logins = [];
  usersData.forEach((item) => {
    logins.push(item.login);
  });
  if (checkMatches(login, logins)) {
    loginUpLabel.className = "msg-login-exist";
    disableSubmit();
    return;
  } else {
    loginUpLabel.classList.remove("msg-login-exist");
  }
  if (password.length < 8) {
    passwordUpLabel.className = "msg-small-password";
    disableSubmit();
    return;
  } else {
    passwordUpLabel.classList.remove("msg-small-password");
  }
  if (password.length > 20) {
    passwordUpLabel.className = "msg-big-password";
    disableSubmit();
    return;
  } else {
    passwordUpLabel.classList.remove("msg-big-password");
  }
  const letterRegex = /[a-zA-Z]/;
  if (!letterRegex.test(password)) {
    passwordUpLabel.className = "msg-letter-password";
    disableSubmit();
    return;
  } else {
    passwordUpLabel.classList.remove("msg-letter-password");
  }
  const digitRegex = /\d/;
  if (!digitRegex.test(password)) {
    passwordUpLabel.className = "msg-digit-password";
    disableSubmit();
    return;
  } else {
    passwordUpLabel.classList.remove("msg-digit-password");
  }
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  if (!specialCharRegex.test(password)) {
    passwordUpLabel.className = "msg-speshal-symbol-password";
    disableSubmit();
    return;
  } else {
    passwordUpLabel.classList.remove("msg-speshal-symbol-password");
  }
  if (password != confirmPassword) {
    confirmPasswordLabel.className = "msg-match-password";
    disableSubmit();
    return;
  } else {
    confirmPasswordLabel.classList.remove("msg-match-password");
  }
  if (termsOfUse == "" || termsOfUse == null) {
    termsOfUseLabel.className = "msg-empty";
    disableSubmit();
    return;
  } else {
    termsOfUseLabel.classList.remove("msg-empty");
  }
  if (!modal) {
    termsOfUseLabel.className = "msg-empty";
    disableSubmit();
    return;
  } else {
    termsOfUseLabel.classList.remove("msg-empty");
  }
  setSubmitActive();
}
signUpForm.addEventListener("input", function () {
  checkValidUpForm();
});
/*TERMS OF USE*/
// устанавливаем триггер для модального окна (название можно изменить)
const modalTrigger = document.getElementsByClassName("trigger")[0];

// получаем ширину отображенного содержимого и толщину ползунка прокрутки
const windowInnerWidth = document.documentElement.clientWidth;
const scrollbarWidth = parseInt(window.innerWidth) - parseInt(windowInnerWidth);

// привязываем необходимые элементы
const bodyElementHTML = document.getElementsByTagName("body")[0];
const modalBackground = document.getElementsByClassName("modalBackground")[0];
const modalClose = document.getElementsByClassName("modalClose")[0];
const modalActive = document.getElementsByClassName("modalActive")[0];

// функция для корректировки положения body при появлении ползунка прокрутки
function bodyMargin() {
  bodyElementHTML.style.marginRight = "-" + scrollbarWidth + "px";
}

// при длинной странице - корректируем сразу
bodyMargin();

// событие нажатия на триггер открытия модального окна
modalTrigger.addEventListener("click", function () {
  // делаем модальное окно видимым
  modalBackground.style.display = "block";

  // если размер экрана больше 1366 пикселей (т.е. на мониторе может появиться ползунок)
  if (windowInnerWidth >= 1366) {
    bodyMargin();
  }

  // позиционируем наше окно по середине, где 175 - половина ширины модального окна
  modalActive.style.left = "calc(50% - " + (175 - scrollbarWidth / 2) + "px)";
  modal = true;
});

// нажатие на крестик закрытия модального окна
modalClose.addEventListener("click", function () {
  modalBackground.style.display = "none";
  if (windowInnerWidth >= 1366) {
    bodyMargin();
  }
});

// закрытие модального окна на зону вне окна, т.е. на фон
modalBackground.addEventListener("click", function (event) {
  if (event.target === modalBackground) {
    modalBackground.style.display = "none";
    if (windowInnerWidth >= 1366) {
      bodyMargin();
    }
  }
});
