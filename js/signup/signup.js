import { makeDOMwithProperties } from "../utils/dom";

// input에 입력 시 유효성 체크
// 회원가입 정보 input 만들어서 서버 제출 및 localStorage 세팅
const userInfo = {
  email: "",
  password: "",
  displayName: "",
  profileImgBase64: "",
};

const validCheck = {
  email: false,
  password: false,
  passwordCheck: false,
  displayName: false,
};

const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const passwordCheckInput = document.querySelector("#passwordCheck");
const userNameInput = document.querySelector("#userName");
const thumbnailInput = document.querySelector("#userThumbnail");
const thumbnailFigure = document.querySelector(".check-thumbnail");
const signupButton = document.querySelector(".signup-button");

// 제출 버튼 클릭
signupButton.addEventListener("click", (event) => {
  event.preventDefault();
  const isInvalid = Object.values(validCheck).includes(false);
  if (isInvalid) {
    Swal.fire({
      icon: "error",
      text: "입력하신 정보를 확인해주세요.",
    });
  }
});

// 유효성 오류 시 보여질 메세지 span
const errorMessageSpan = makeDOMwithProperties("span", {
  className: "error-message",
});

// 이메일 유효성 검사
emailInput.addEventListener("keyup", (event) => {
  return validEmailCheck(event.target.value);
});

// 패스워드 유효성 검사
passwordInput.addEventListener("keyup", (event) => {
  validpassWordCheck(event.target.value);
});

// 패스워드 확인 유효성 검사
passwordCheckInput.addEventListener("keyup", (event) => {
  samePasswordCheck(event.target.value);
});
// 사용자 이름 유효성 검사
userNameInput.addEventListener("keyup", (event) => {
  validUserNameCheck(event.target.value);
});

// 썸네일 파일 업로드 시 썸네일 보이도록
thumbnailInput.addEventListener("change", () => {
  const file = thumbnailInput.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  const profileImgBase64 = reader.addEventListener("load", (e) => {
    const profileImgBase64 = e.target.result;
    thumbnailFigure.innerHTML = `<img src=${profileImgBase64} alt="선택한 사진" />`;
    return profileImgBase64;
  });
});

function validEmailCheck(email) {
  const pattern =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (email.match(pattern) != null) {
    if (emailInput.parentElement.querySelector(".error-message")) {
      emailInput.parentElement.removeChild(errorMessageSpan);
      emailInput.classList.remove("error");
      validCheck.email = true;
    }
  } else {
    errorMessageSpan.textContent = "올바른 이메일 형식을 입력해주세요";
    emailInput.parentElement.append(errorMessageSpan);
    emailInput.classList.add("error");
    validCheck.email = false;
  }
}

function validpassWordCheck(password) {
  const num = password.search(/[0-9]/g);
  const eng = password.search(/[a-z]/gi);

  if (password.length < 8 || password.length > 20) {
    errorMessageSpan.textContent =
      "비밀번호를 8자리 이상 20자리 이하로 입력해주세요.";
    passwordInput.parentElement.append(errorMessageSpan);
    passwordInput.classList.add("error");
    validCheck.password = false;
  } else if (password.search(/\s/) != -1) {
    errorMessageSpan.textContent = "비밀번호는 공백 없이 입력해주세요.";
    passwordInput.parentElement.append(errorMessageSpan);
    passwordInput.classList.add("error");
    validCheck.password = false;
  } else if (num < 0 || eng < 0) {
    errorMessageSpan.textContent = "영문,숫자를 혼합하여 입력해주세요.";
    passwordInput.parentElement.append(errorMessageSpan);
    passwordInput.classList.add("error");
    validCheck.password = false;
  } else {
    if (passwordInput.parentElement.querySelector(".error-message")) {
      passwordInput.parentElement.removeChild(errorMessageSpan);
      passwordInput.classList.remove("error");
      validCheck.password = true;
    }
  }
}

function samePasswordCheck(password) {
  const enteredPassword = passwordInput.value;
  if (password != enteredPassword) {
    errorMessageSpan.textContent = "비밀번호가 일치하지 않습니다.";
    passwordCheckInput.parentElement.append(errorMessageSpan);
    passwordCheckInput.classList.add("error");
    validCheck.passwordCheck = false;
  } else {
    if (passwordCheckInput.parentElement.querySelector(".error-message")) {
      passwordCheckInput.parentElement.removeChild(errorMessageSpan);
      passwordCheckInput.classList.remove("error");
    }

    validCheck.passwordCheck = true;
  }
}

function validUserNameCheck(userName) {
  if (userName.length > 20) {
    errorMessageSpan.textContent = "사용자 이름은 20자 이하여야 합니다.";
    userNameInput.parentElement.append(errorMessageSpan);
    userNameInput.classList.add("error");
    validCheck.displayName = false;
  } else {
    if (userNameInput.parentElement.querySelector(".error-message")) {
      userNameInput.parentElement.removeChild(errorMessageSpan);
      userNameInput.classList.remove("error");
    }
    validCheck.displayName = true;
  }
}
