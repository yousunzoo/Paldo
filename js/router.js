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
import { adminWrapper } from "./components/mainComponents";
import { toggleClass } from "./adminProductList/adminGoodsPage.js";
import { chartFn } from "./library/chart.js";

import report_page from "./adminPages/reportPage";
import product_page from "./adminPages/productPage";
import add_product_page from "./adminPages/addProductPage";
import product_detail_page from "./adminPages/productDetailPage";
import product_edit_page from "./adminPages/productEditPage";
import transaction_page from "./adminPages/transactionPage";
import transaction_detail_page from "./adminPages/detailTransacitonPage";

import { pagination } from "./adminProductList/pagination.js";
import { renderDetailPage } from "./adminDetailProducd/renderDetailProduct.js";
import { renderEditDetailPage } from "./adminEditProduct/editProduct.js";
import { renderAddPage } from "./adminAddProduct/addPodouct.js";
import { transactionPagination } from "./adminTransactionList/transactionPagination.js";
import { renderDetailTransactionPage } from "./adminDetailTransaction/renderDetailTransaction";
import { renderReportStatus } from "./adminReport/renderStoreStatus.js";

const router = new Navigo("/");
const mainSection = document.querySelector("#main");
const sidebarArea = document.querySelector("#sidebar-area");
const body = document.querySelector("body");

// 처음 페이지가 로드 되었을 때
(async () => {
  const isLogin = await checkAuthorization();

  if (isLogin) {
    const loginId = JSON.parse(localStorage.getItem("loginInfo")).loginId;
    if (loginId === "admin@paldo.com") {
      body.innerHTML = adminWrapper;
      router.navigate("admin/report");
    } else {
      changeHeader();
    }
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
    "admin/report": async () => {
      document.querySelector("#content").innerHTML = report_page;
      chartFn();
      renderReportStatus();
    },
    "admin/product/": () => {
      document.querySelector("#content").innerHTML = product_page;
      const categorybutton = document.querySelector(".button-category");
      const categoryList = document.querySelector(".category-list");
      const soldoutbutton = document.querySelector(".button-soldout");
      const soldoutList = document.querySelector(".soldout-list");

      toggleClass(categorybutton, categoryList);
      toggleClass(soldoutbutton, soldoutList);

      // 검색 버튼 입력 했을때
      const inputEl = document.querySelector(".search-goodsname");
      const inputbuttonEl = document.querySelector(".search");
      inputEl.addEventListener("keyup", (event) => {
        if (event.key === "Enter" && !event.isComposing) {
          search = inputEl.value;
          pagination(search);
        }
      });

      inputbuttonEl.addEventListener("click", () => {
        search = inputEl.value;
        pagination(search);
      });

      let search;
      pagination(search);
    },
    "admin/product/:id": ({ data }) => {
      console.log(data);
      document.querySelector("#content").innerHTML = product_detail_page;
      renderDetailPage(data.id, router);
    },
    "admin/transaction": () => {
      document.querySelector("#content").innerHTML = transaction_page;
      // 검색 버튼 입력 했을때
      const inputEl = document.querySelector(".search-username");
      const inputbuttonEl = document.querySelector(".search");
      inputEl.addEventListener("keyup", (event) => {
        if (event.key === "Enter" && !event.isComposing) {
          search = inputEl.value;
          transactionPagination(search);
        }
      });
      inputbuttonEl.addEventListener("click", () => {
        search = inputEl.value;
        transactionPagination(search);
      });

      let search;
      transactionPagination(search);
      flatpickr("#myDatepicker", {
        dateFormat: "Y-m-d", // set the date format
        disableMobile: true, // disable mobile optimizations
      });

      const pickerEl = document.querySelector(".flatpickr-input");
      pickerEl.addEventListener("change", () => {
        transactionPagination(pickerEl.value);
      });
    },
    "admin/editproduct/:id": ({ data }) => {
      document.querySelector("#content").innerHTML = product_edit_page;
      renderEditDetailPage(data.id, router);
    },
    "admin/registration": () => {
      document.querySelector("#content").innerHTML = add_product_page;
      renderAddPage();
    },
    "transaction/:id": ({ data }) => {
      document.querySelector("#content").innerHTML = transaction_detail_page;
      renderDetailTransactionPage(data);
    },
  })
  .resolve();

router.link("/");

// setSidebarSwiper(router);
// // search input
// handleSearchInput(router);
// // to-top-button
// goToTopFn();
