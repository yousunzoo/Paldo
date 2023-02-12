import { requestSignup } from "../api/requestSignup";
import { setUserInfo } from "../localStorage/setLoginData";
import { makeDOMwithProperties } from "../utils/dom";

// input에 입력 시 유효성 체크
// 회원가입 정보 input 만들어서 서버 제출 및 localStorage 세팅
const userInfo = {
  email: "",
  password: "",
  displayName: "",
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
signupButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const isInvalid = Object.values(validCheck).includes(false);
  if (isInvalid) {
    Swal.fire({
      icon: "error",
      text: "입력하신 정보를 확인해주세요.",
    });
    return;
  }

  // 회원가입 요청
  const result = await requestSignup(userInfo);

  // localStorage에 회원정보 저장
  setUserInfo(result, userInfo.email);
});

// 이메일 유효성 검사
emailInput.addEventListener("input", (event) => {
  return validEmailCheck(event.target.value);
});

// 패스워드 유효성 검사
passwordInput.addEventListener("input", (event) => {
  validpassWordCheck(event.target.value);
});

// 패스워드 확인 유효성 검사
passwordCheckInput.addEventListener("input", (event) => {
  samePasswordCheck(event.target.value);
});
// 사용자 이름 유효성 검사
userNameInput.addEventListener("input", (event) => {
  validUserNameCheck(event.target.value);
});

// 썸네일 파일 업로드 시 썸네일 보이도록
thumbnailInput.addEventListener("change", () => {
  const file = thumbnailInput.files[0];
  validThumbnailCheck(file);
});

function validEmailCheck(email) {
  const pattern =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (email.match(pattern) != null) {
    if (emailInput.parentElement.querySelector(".error-message")) {
      // emailInput.parentElement.removeChild(errorMessageSpan);

      emailInput.parentElement
        .querySelector(".error-message")
        .classList.remove("active");
      emailInput.classList.remove("error");
      validCheck.email = true;
      userInfo.email = email;
    }
  } else {
    // errorMessageSpan.textContent = "올바른 이메일 형식을 입력해주세요";
    emailInput.parentElement
      .querySelector(".error-message")
      .classList.add("active");
    emailInput.classList.add("error");
    validCheck.email = false;
  }
}

function validpassWordCheck(password) {
  const num = password.search(/[0-9]/g);
  const eng = password.search(/[a-z]/gi);
  const passwordErrorMesssage =
    passwordInput.parentElement.querySelector(".error-message");
  if (password.length < 8 || password.length > 20) {
    passwordErrorMesssage.textContent =
      "비밀번호를 8자리 이상 20자리 이하로 입력해주세요.";
    passwordErrorMesssage.classList.add("active");
    passwordInput.classList.add("error");
    validCheck.password = false;
  } else if (password.search(/\s/) != -1) {
    passwordErrorMesssage.textContent = "비밀번호는 공백 없이 입력해주세요.";
    !passwordErrorMesssage.classList.contains("active") &&
      passwordErrorMesssage.classList.add("active");
    passwordInput.classList.add("error");
    validCheck.password = false;
  } else if (num < 0 || eng < 0) {
    passwordErrorMesssage.textContent = "영문,숫자를 혼합하여 입력해주세요.";
    !passwordErrorMesssage.classList.contains("active") &&
      passwordErrorMesssage.classList.add("active");
    passwordInput.classList.add("error");
    validCheck.password = false;
  } else {
    if (passwordInput.parentElement.querySelector(".error-message")) {
      passwordErrorMesssage.classList.remove("active");
      passwordInput.classList.remove("error");
      validCheck.password = true;
      userInfo.password = password;
    }
  }
}

function samePasswordCheck(password) {
  const enteredPassword = passwordInput.value;
  const samePasswordCheckSpan =
    passwordCheckInput.parentElement.querySelector(".error-message");

  if (password != enteredPassword) {
    samePasswordCheckSpan.classList.add("active");
    passwordCheckInput.classList.add("error");
    validCheck.passwordCheck = false;
  } else {
    if (samePasswordCheckSpan.classList.contains("active")) {
      samePasswordCheckSpan.classList.remove("active");
      passwordCheckInput.classList.remove("error");
    }

    validCheck.passwordCheck = true;
  }
}

function validUserNameCheck(userName) {
  const errorMessageSpan =
    userNameInput.parentElement.querySelector(".error-message");
  if (userName.length > 20) {
    errorMessageSpan.classList.add("active");
    userNameInput.classList.add("error");
    validCheck.displayName = false;
  } else {
    if (errorMessageSpan.classList.contains("active")) {
      errorMessageSpan.classList.remove("active");
      userNameInput.classList.remove("error");
    }
    validCheck.displayName = true;
    userInfo.displayName = userName;
  }
}

function validThumbnailCheck(file) {
  const MAXIMUM_SIZE = 1000000;
  const validFileType = [
    "image/jpg",
    "image/jpeg",
    "image/webp",
    "image/png",
    "image/gif",
    "image/svg+xml",
  ];
  const errorMessageSpan =
    thumbnailInput.parentElement.querySelector(".error-message");
  // 파일 크기 1MB 이하
  if (file.size > MAXIMUM_SIZE) {
    errorMessageSpan.textContent = "파일 크기는 1MB 이하여야 합니다.";
    errorMessageSpan.classList.add("active");
    validCheck.thumbnail = false;
    return;
  } else if (!validFileType.includes(file.type)) {
    errorMessageSpan.textContent = "유효한 파일 형식이 아닙니다.";
    !errorMessageSpan.classList.contains("active") &&
      errorMessageSpan.classList.add("active");
    validCheck.thumbnail = false;
    return;
  } else {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", (e) => {
      const profileImgBase64 = e.target.result;
      thumbnailFigure.innerHTML = `<img src=${profileImgBase64} alt="선택한 사진" />`;
      validCheck.thumbnail = true;
      userInfo.profileImgBase64 = profileImgBase64;
    });
  }
}
