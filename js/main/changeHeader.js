import { requestLogout } from "../api/requestLogout";
import { makeDOMwithProperties } from "../utils/dom";

export function changeHeader() {
  const headerMenu = document.querySelector(".header-menu");
  headerMenu.innerHTML = "";
  const loginId = JSON.parse(localStorage.getItem("loginInfo")).loginId;
  const userName = JSON.parse(localStorage.getItem(loginId)).userInfo
    .displayName;
  const userMenu = makeDOMwithProperties("li", {
    className: "header-menu-item",
    textContent: `${userName}님 환영합니다!`,
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

  logoutButton.addEventListener("click", async function () {
    const logout = await requestLogout();
    if (logout) location.reload();
  });
}
