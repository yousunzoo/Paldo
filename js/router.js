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

import { adminWrapper, userWrapper } from "./components/mainComponents";
import { chartFn } from "./library/chart.js";

import notFoundPage from "./components/notFoundPage";
import adminReportPage from "./adminPages/adminReportPage";
import adminProductListPage from "./adminPages/adminProductListPage";
import adminAddProductPage from "./adminPages/adminAddProductPage";
import adminProductDetailPage from "./adminPages/adminProductDetailPage";
import adminProductEditPage from "./adminPages/adminProductEditPage";
import adminTransactionPage from "./adminPages/adminTransactionPage";
import adminTransactionDetailPage from "./adminPages/adminTransactionDetailPage";

import { productPagination } from "./adminProductList/productPagination";
import { productPageButton } from "./adminProductList/productPageFunc";

import { renderDetailPage } from "./adminDetailProducd/renderDetailProduct.js";
import { renderEditDetailPage } from "./adminEditProduct/editProduct.js";
import { renderAddPage } from "./adminAddProduct/addPodouct.js";
import { transactionPagination } from "./adminTransactionList/transactionPagination.js";
import { renderDetailTransactionPage } from "./adminDetailTransaction/renderDetailTransaction";
import { renderReportStatus } from "./adminReport/renderStoreStatus.js";
import { requestLogout } from "./api/requestLogout";
import { searchTransaction } from "./adminTransactionList/searchTransaction";
import { pickr } from "./library/pickr";
import { memoizedGetProduct } from "./api/getProduct";
import { productFilterList } from "./adminProductList/productFilter";
import { memoizedGetTransactions } from "./api/getTransactions";
import { transctionFilterList } from "./adminTransactionList/transctionFilter";

const mainRouter = new Navigo("/");
const body = document.querySelector("body");

// 처음 페이지가 로드 되었을 때
mainRouter.link("/");

mainRouter
  .on({
    "/": async () => {
      body.innerHTML = userWrapper;
      document.querySelector("#main").innerHTML = mainPage;
      setSidebarSwiper(mainRouter);
      // search input
      handleSearchInput(mainRouter);
      // to-top-button
      goToTopFn();
      setPrdList(mainRouter);
      swiperAction();
      sidebarAction();
      const sidebarArea = document.querySelector("#sidebar-area");
      sidebarArea.style.paddingTop = "500px";
      const logoButton = document.querySelector("#userWrapper .logo");
      logoButton.addEventListener("click", (event) => {
        event.preventDefault();
        mainRouter.navigate("/");
      });
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
      const sidebarArea = document.querySelector("#sidebar-area");
      document.querySelector("#main").innerHTML = loginPage;
      loginEvent(mainRouter);
      sidebarArea.style.paddingTop = "100px";
    },
    signup: () => {
      const sidebarArea = document.querySelector("#sidebar-area");
      document.querySelector("#main").innerHTML = sigupPage;
      signUpEvent();
      sidebarArea.style.paddingTop = "100px";
    },
    "search/:id": async ({ data }) => {
      const sidebarArea = document.querySelector("#sidebar-area");

      document.querySelector("#main").innerHTML = searchPage;
      await setResultPage(data.id, mainRouter);
      sidebarArea.style.paddingTop = "100px";
    },
    coupon: () => {
      const sidebarArea = document.querySelector("#sidebar-area");
      document.querySelector("#main").innerHTML = couponPage;
      handleCouponButton();
      sidebarArea.style.paddingTop = "100px";
    },
    "productDetail/:id": async ({ data }) => {
      const sidebarArea = document.querySelector("#sidebar-area");
      document.querySelector("#main").innerHTML = productDetailPage;
      await setProductDetailPage(data.id, mainRouter);
      sidebarArea.style.paddingTop = "100px";
    },
    "products/:id": async ({ data }) => {
      const sidebarArea = document.querySelector("#sidebar-area");
      document.querySelector("#main").innerHTML = productPage;
      await setProductPage(data.id, mainRouter);
      sidebarArea.style.paddingTop = "100px";
    },
    cart: () => {
      const sidebarArea = document.querySelector("#sidebar-area");
      document.querySelector("#main").innerHTML = cartPage;
      setCartPage(mainRouter);
      sidebarArea.style.paddingTop = "100px";
    },
    "mypage/orderList": async () => {
      document.querySelector("#main").innerHTML = orderListPage;
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
      document.querySelector("#main").innerHTML = accountPage;
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
      document.querySelector("#main").innerHTML = likePage;
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
      document.querySelector("#main").innerHTML = modifyPage;
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
      document.querySelector("#main").innerHTML = orderSheetPage;
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
      // localhost:1234/admin
      body.innerHTML = adminWrapper;
      const router = new Navigo("/admin");
      router.navigate("/report"); // localhost:1234/admin/report
      const logoutButton = document.querySelector(".info-logout");
      logoutButton.addEventListener("click", async () => {
        await requestLogout();
        mainRouter.navigate("/");
      });
      router
        .on({
          "/": () => {
            router.navigate("/report");
          },
          report: async () => {
            document.querySelector("#content").innerHTML = adminReportPage;
            chartFn();
            renderReportStatus();
          },
          "product/": async () => {
            document.querySelector("#content").innerHTML = adminProductListPage;
            let search;
            const listEls = await memoizedGetProduct();
            const listTag = document.querySelector(".search-wrapper");
            listTag.addEventListener("click", (e) => {
              if (e.target.className !== "list-tag") return;
              const filterRes = productFilterList(listEls, e.target.textContent);
              productPagination(filterRes, router);
            });
            const filterRes = productFilterList(listEls, search);
            productPagination(filterRes, router);
            productPageButton(router);
          },

          "product/:id": ({ data }) => {
            document.querySelector("#content").innerHTML = adminProductDetailPage;
            renderDetailPage(data.id, router);
          },
          "editproduct/:id": ({ data }) => {
            document.querySelector("#content").innerHTML = adminProductEditPage;
            renderEditDetailPage(data.id, router);
          },
          registration: () => {
            document.querySelector("#content").innerHTML = adminAddProductPage;
            renderAddPage(router);
          },
          transaction: async () => {
            document.querySelector("#content").innerHTML = adminTransactionPage;
            let search;
            const listEls = await memoizedGetTransactions();
            const filterRes = transctionFilterList(listEls, search);
            transactionPagination(filterRes, router);
            searchTransaction(filterRes, router);
            pickr(router);
          },
          "transaction/:id": ({ data }) => {
            document.querySelector("#content").innerHTML = adminTransactionDetailPage;
            renderDetailTransactionPage(data);
          },
        })
        .resolve();
    },
  })
  .notFound(() => {
    body.innerHTML = userWrapper;
    document.querySelector("#main").innerHTML = notFoundPage;
  })
  .resolve();
