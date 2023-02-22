import { headers } from "./api/headers";
import Navigo from "navigo"; // When using ES modules.
import { checkAuthorization } from "./api/checkAuthorization";
import {
  cartPage,
  couponPage,
  loginPage,
  mainPage,
  productDetailPage,
  productPage,
  searchPage,
  sigupPage,
} from "./components/userPage";
import handleCouponButton from "./coupon/coupon";
import handleSearchInput from "./header/handleSearchInput";
import { swiperAction, sidebarAction } from "./library/swiper";
import goToTopFn from "./library/toTop";
import loginEvent from "./login";
import { changeHeader } from "./main/changeHeader";
import setPrdList from "./main/setPrdList";
import setProductPage from "./product/setProductPage";
import setResultPage from "./search/searchResult";
import signUpEvent from "./signup/signup";
import { setSidebarSwiper } from "./sidebar";
import setProductDetailPage from "./product/setProductDetailPage";
import setCartPage from "./cart/setCartPage";

const router = new Navigo("/");
const mainSection = document.querySelector("#main");
const sidebarArea = document.querySelector("#sidebar-area");

// 처음 페이지가 로드 되었을 때
(async () => {
  const isLogin = await checkAuthorization();

  if (isLogin) {
    changeHeader();
  }
})();

router
  .on({
    "/": async () => {
      window.scrollTo(0, 0);
      mainSection.innerHTML = mainPage;
      setPrdList(router);
      swiperAction();
      sidebarArea.style.paddingTop = "500px";
    },
    login: async () => {
      window.scrollTo(0, 0);
      mainSection.innerHTML = loginPage;
      loginEvent(router);
      sidebarArea.style.paddingTop = "100px";
    },
    signup: () => {
      window.scrollTo(0, 0);
      mainSection.innerHTML = sigupPage;
      signUpEvent();
      sidebarArea.style.paddingTop = "100px";
    },
    "search/:id": async ({ data }) => {
      window.scrollTo(0, 0);
      mainSection.innerHTML = searchPage;
      await setResultPage(data.id, router);
      sidebarArea.style.paddingTop = "100px";
    },
    coupon: () => {
      window.scrollTo(0, 0);
      mainSection.innerHTML = couponPage;
      handleCouponButton();
      sidebarArea.style.paddingTop = "100px";
    },
    "productDetail/:id": async ({ data }) => {
      window.scrollTo(0, 0);
      mainSection.innerHTML = productDetailPage;
      await setProductDetailPage(data.id, router);
      sidebarArea.style.paddingTop = "100px";
    },
    "products/:id": async ({ data }) => {
      window.scrollTo(0, 0);
      mainSection.innerHTML = productPage;
      await setProductPage(data.id, router);
      sidebarArea.style.paddingTop = "100px";
    },
    cart: () => {
      window.scrollTo(0, 0);
      mainSection.innerHTML = cartPage;
      setCartPage(router);
      sidebarArea.style.paddingTop = "100px";
    },
  })
  .resolve();

router.link("/");

setSidebarSwiper(router);
// search input
handleSearchInput(router);
// to-top-button
goToTopFn();
