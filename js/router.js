import Navigo from "navigo"; // When using ES modules.
import { checkAuthorization } from "./api/checkAuthorization";
import { loginPage, mainPage, sigupPage } from "./components/userPage";
import swiperAction from "./library/swiper";
import loginEvent from "./login";
import { changeHeader } from "./main/changeHeader";
import setPrdList from "./main/setPrdList";
import signUpEvent from "./signup/signup";

const router = new Navigo("/", { hash: true });
const mainSection = document.querySelector("#main");

// 처음 페이지가 로드 되었을 때
router
  .on("/", async () => {
    mainSection.innerHTML = mainPage;
    setPrdList();
    swiperAction();
    const isLogin = await checkAuthorization();

    if (isLogin) {
      changeHeader();
    }
  })
  .on("login", () => {
    // do something
    mainSection.innerHTML = loginPage;
    loginEvent();
    // isLogin && router.navigate("/");
  })
  .on("signup", () => {
    mainSection.innerHTML = sigupPage;
    signUpEvent();
  })
  .resolve();

router.link("/");
