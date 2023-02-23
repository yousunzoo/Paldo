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
  orderListPage,
  accountPage,
  likePage,
  modifyPage,
  orderSheetPage,
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

import { setOrderListPage } from "./order-list/orderList";
import { setAccountPage } from "./account/account";
import { setLikePage } from "./like/like";
import { setModifyPage } from "./personal-info-modify/personalInfoModify";
import { setOrderSheetPage } from "./order-sheet/orderSheet";
import { setProfile } from "./profile/profile.js";

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

const mainRouter = new Navigo("/");
const mainSection = document.querySelector("#main");
const sidebarArea = document.querySelector("#sidebar-area");
const body = document.querySelector("body");

// 처음 페이지가 로드 되었을 때
mainRouter.link("/");
(async () => {
  const isLogin = await checkAuthorization();

  if (isLogin) {
    const loginId = JSON.parse(localStorage.getItem("loginInfo")).loginId;
    if (loginId === "admin@paldo.com") {
      mainRouter.navigate("admin");
    } else {
      changeHeader();
      setSidebarSwiper(mainRouter);
      // search input
      handleSearchInput(mainRouter);
      // to-top-button
      goToTopFn();
    }
  }
})();

mainRouter
  .on({
    "/": async () => {
      window.scrollTo(0, 0);
      mainSection.innerHTML = mainPage;
      setSidebarSwiper(mainRouter);
      // search input
      handleSearchInput(mainRouter);
      // to-top-button
      goToTopFn();
      setPrdList(mainRouter);
      swiperAction();
      sidebarArea.style.paddingTop = "500px";

      const isLogin = await checkAuthorization();
      if (isLogin) {
        const loginId = JSON.parse(localStorage.getItem("loginInfo")).loginId;
        if (loginId === "admin@paldo.com") {
          mainRouter.navigate("admin");
        } else {
          changeHeader();
        }
      }
    },
    login: async () => {
      window.scrollTo(0, 0);
      mainSection.innerHTML = loginPage;
      loginEvent(mainRouter);
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
      await setResultPage(data.id, mainRouter);
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
      await setProductDetailPage(data.id, mainRouter);
      sidebarArea.style.paddingTop = "100px";
    },
    "products/:id": async ({ data }) => {
      window.scrollTo(0, 0);
      mainSection.innerHTML = productPage;
      await setProductPage(data.id, mainRouter);
      sidebarArea.style.paddingTop = "100px";
    },
    cart: () => {
      window.scrollTo(0, 0);
      mainSection.innerHTML = cartPage;
      setCartPage(mainRouter);
      sidebarArea.style.paddingTop = "100px";
    },
    "mypage/orderList": async () => {
      window.scrollTo(0, 0);
      mainSection.innerHTML = orderListPage;
      const isValidUser = await checkAuthorization();
      if (isValidUser) {
        setProfile();
        setOrderListPage();
      } else {
        Swal.fire({
          icon: "error",
          title: "사용자 세션이 만료되었습니다.",
          text: "로그인 페이지로 이동합니다.",
        }).then(() => {
          mainRouter.navigate("/login");
        });
      }
    },
    "mypage/account": async () => {
      window.scrollTo(0, 0);
      mainSection.innerHTML = accountPage;
      const isValidUser = await checkAuthorization();
      if (isValidUser) {
        setProfile();
        setAccountPage();
      } else {
        Swal.fire({
          icon: "error",
          title: "사용자 세션이 만료되었습니다.",
          text: "로그인 페이지로 이동합니다.",
        }).then(() => {
          mainRouter.navigate("/login");
        });
      }
    },
    "mypage/like": async () => {
      window.scrollTo(0, 0);
      mainSection.innerHTML = likePage;
      const isValidUser = await checkAuthorization();
      if (isValidUser) {
        setProfile();
        setLikePage(mainRouter);
      } else {
        Swal.fire({
          icon: "error",
          title: "사용자 세션이 만료되었습니다.",
          text: "로그인 페이지로 이동합니다.",
        }).then(() => {
          mainRouter.navigate("/login");
        });
      }
    },
    "mypage/modify": async () => {
      window.scrollTo(0, 0);
      mainSection.innerHTML = modifyPage;
      const isValidUser = await checkAuthorization();
      if (isValidUser) {
        setProfile();
        setModifyPage();
      } else {
        Swal.fire({
          icon: "error",
          title: "사용자 세션이 만료되었습니다.",
          text: "로그인 페이지로 이동합니다.",
        }).then(() => {
          mainRouter.navigate("/login");
        });
      }
    },
    payment: async () => {
      window.scrollTo(0, 0);
      mainSection.innerHTML = orderSheetPage;
      const isValidUser = await checkAuthorization();
      if (isValidUser) {
        setOrderSheetPage();
      } else {
        Swal.fire({
          icon: "error",
          title: "사용자 세션이 만료되었습니다.",
          text: "로그인 페이지로 이동합니다.",
        }).then(() => {
          mainRouter.navigate("/login");
        });
      }
    },
    admin: () => {
      const router = new Navigo("/admin");
      router
        .on({
          "/": () => {
            body.innerHTML = adminWrapper;
            router.navigate("/report");
          },
          report: async () => {
            document.querySelector("#content").innerHTML = report_page;
            chartFn();
            renderReportStatus();
          },
          "product/": () => {
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
                pagination(search, router);
              }
            });

            inputbuttonEl.addEventListener("click", () => {
              search = inputEl.value;
              pagination(search, router);
            });

            let search;
            pagination(search, router);
          },
          "product/:id": ({ data }) => {
            console.log(data);
            document.querySelector("#content").innerHTML = product_detail_page;
            renderDetailPage(data.id, router);
          },
          transaction: () => {
            document.querySelector("#content").innerHTML = transaction_page;
            // 검색 버튼 입력 했을때
            const inputEl = document.querySelector(".search-username");
            const inputbuttonEl = document.querySelector(".search");
            inputEl.addEventListener("keyup", (event) => {
              if (event.key === "Enter" && !event.isComposing) {
                search = inputEl.value;
                transactionPagination(search, router);
              }
            });
            inputbuttonEl.addEventListener("click", () => {
              search = inputEl.value;
              transactionPagination(search, router);
            });

            let search;
            transactionPagination(search, router);
            flatpickr("#myDatepicker", {
              dateFormat: "Y-m-d", // set the date format
              disableMobile: true, // disable mobile optimizations
            });

            const pickerEl = document.querySelector(".flatpickr-input");
            pickerEl.addEventListener("change", () => {
              transactionPagination(pickerEl.value, router);
            });
          },
          "editproduct/:id": ({ data }) => {
            document.querySelector("#content").innerHTML = product_edit_page;
            renderEditDetailPage(data.id, router);
          },
          registration: () => {
            document.querySelector("#content").innerHTML = add_product_page;
            renderAddPage();
          },
          "transaction/:id": ({ data }) => {
            document.querySelector("#content").innerHTML =
              transaction_detail_page;
            renderDetailTransactionPage(data);
          },
        })
        .resolve();
    },
  })
  .resolve();
