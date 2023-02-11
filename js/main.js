import { checkAuthorization } from "./api/checkAuthorization";
import { makeDOMwithProperties } from "./utils/dom";

window.onload = async function () {
  const isLogin = await checkAuthorization();

  if (isLogin) {
    changeHeader();
  }
};

function changeHeader() {
  const headerMenu = document.querySelector(".header-menu");
  headerMenu.innerHTML = "";
  const loginId = JSON.parse(localStorage.getItem("loginInfo")).loginId;
  const userName = JSON.parse(localStorage.getItem(loginId)).userInfo
    .displayName;
  console.log(userName);
  const userMenu = makeDOMwithProperties("li", {
    className: "header-menu-item",
    textContent: `${userName}님 환영합니다!`,
  });
  const logoutMenu = makeDOMwithProperties("li", {
    className: "header-menu-item",
    innerHTML: '<button class="logout-button">로그아웃</button>',
  });
  headerMenu.append(userMenu, logoutMenu);
}
