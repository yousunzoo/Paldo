// input에 입력 시 유효성 체크

import { makeDOMwithProperties } from "../utils/dom";

const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const passwordCheckInput = document.querySelector("#passwordCheck");
const userNameInput = document.querySelector("#userName");
const thumbnailInput = document.querySelector("#userThumbnail");

// 유효성 오류 시 보여질 메세지 span
const errorMessageSpan = makeDOMwithProperties("span", {
  className: "error-message",
});

emailInput.addEventListener("keyup", (event) => {
  validEmail(event.target.value);
});

function validEmail(email) {
  if (validEmailCheck(email) == false) {
    errorMessageSpan.textContent = "올바른 이메일 형식을 입력해주세요";
    emailInput.parentElement.append(errorMessageSpan);
    emailInput.classList.add("error");
  } else {
    emailInput.parentElement.removeChild(errorMessageSpan);
    emailInput.classList.remove("error");
  }
}

function validEmailCheck(email) {
  var pattern =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return email.match(pattern) != null;
}
