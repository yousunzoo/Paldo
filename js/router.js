import Navigo from "navigo"; // When using ES modules.
import { checkAuthorization } from "./api/checkAuthorization";
import {
  couponPage,
  loginPage,
  mainPage,
  productPage,
  searchPage,
  sigupPage,
} from "./components/userPage";
import handleCouponButton from "./coupon/coupon";
import handleSearchInput from "./header/handleSearchInput";
import swiperAction from "./library/swiper";
import loginEvent from "./login";
import { changeHeader } from "./main/changeHeader";
import setPrdList from "./main/setPrdList";
import setProductPage from "./product/setProductPage";
import setResultPage from "./search/searchResult";
import signUpEvent from "./signup/signup";

const router = new Navigo("/");
const mainSection = document.querySelector("#main");

// 처음 페이지가 로드 되었을 때
router
  .on({
    "/": async () => {
      mainSection.innerHTML = mainPage;
      setPrdList(router);
      swiperAction();
      const isLogin = await checkAuthorization();

      if (isLogin) {
        changeHeader();
      }
      handleSearchInput(router);
    },
    login: () => {
      // do something
      mainSection.innerHTML = loginPage;
      loginEvent();
      // isLogin && router.navigate("/");
    },
    signup: () => {
      mainSection.innerHTML = sigupPage;
      signUpEvent();
    },
    "search/:id": async ({ data }) => {
      mainSection.innerHTML = searchPage;
      await setResultPage(data.id);
    },
    coupon: () => {
      mainSection.innerHTML = couponPage;
      handleCouponButton();
    },
    "productDetail/:id": ({ data }) => {},
    "products/:id": async ({ data }) => {
      mainSection.innerHTML = productPage;
      await setProductPage(data.id);
    },
  })
  .resolve();

router.link("/");
