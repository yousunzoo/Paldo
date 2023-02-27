import { requestLogout } from "../api/requestLogout";
import { makeDOMwithProperties } from "../utils/dom";
import resetHeader from "./resetHeader";

export function changeHeader(router) {
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
    innerHTML: `<a href="mypage/orderList" data-navigo>${userName}님 환영합니다!</a>`,
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

  // 로그아웃 버튼 클릭 시 로그아웃
  logoutButton.addEventListener("click", async function () {
    const result = await requestLogout();
    if (result) {
      resetHeader();
    }
  });
  userMenu.addEventListener("click", (event) => {
    event.preventDefault();
    router.navigate("mypage/orderList");
  });
}
