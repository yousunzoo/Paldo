import { requestLogout } from "../api/requestLogout";
import { makeDOMwithProperties } from "../utils/dom";

export function changeHeader() {
  // 로그인 한 유저 userName 가져오기
  const loginId = JSON.parse(localStorage.getItem("loginInfo")).loginId;
  const userName = JSON.parse(localStorage.getItem(loginId)).userInfo
    .displayName;
  //SPA 구현 시 사용
  // 로그인 시 headerMenu 아이템 바뀜
  const headerMenu = document.querySelector(".header-menu");
  headerMenu.innerHTML = "";

  const userMenu = makeDOMwithProperties("li", {
    className: "header-menu-item",
    innerHTML: `<a href="./order-list.html">${userName}님 환영합니다!</a>`,
  });
  const logoutMenu = makeDOMwithProperties("li", {
    className: "header-menu-item",
  });

  const logoutButton = makeDOMwithProperties("button", {
    class: "logout-button",
    textContent: "로그아웃",
  });
  logoutMenu.append(logoutButton);
  headerMenu.append(userMenu, logoutMenu);

  // user-menu class active 부여
  // const loginMenu = document.querySelector(".login-menu");
  // const userMenu = document.querySelector(".user-menu");
  // const userNameSpan = userMenu.querySelector(".user-name");
  // userNameSpan.textContent = userName;

  // loginMenu.classList.remove("active");
  // userMenu.classList.add("active");
  // const logoutButton = userMenu.querySelector(".logout-button");

  // 로그아웃 버튼 클릭 시 로그아웃
  logoutButton.addEventListener("click", async function () {
    const logout = await requestLogout();
    if (logout) location.reload();
  });
}
