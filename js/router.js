import Navigo from "navigo"; // When using ES modules.
import { checkAuthorization } from "./api/checkAuthorization.js";
import userWrapper from "./components/wrappers/userWrapper.js";
import adminWrapper from "./components/wrappers/adminWrapper.js";
import userMainPage from "./components/userPage/userMainPage.js";
import userLoginPage from "./components/userPage/userLoginPage.js";
import userSignupPage from "./components/userPage/userSignupPage.js";
import userSearchPage from "./components/userPage/userSearchPage.js";
import userCouponPage from "./components/userPage/userCouponPage.js";
import userProductPage from "./components/userPage/userProductPage.js";
import userProductDetailPage from "./components/userPage/userProductDetailPage.js";
import userCartPage from "./components/userPage/userCartPage.js";
import userOrderListPage from "./components/userPage/userOrderListPage.js";
import userAccountPage from "./components/userPage/userAccountPage.js";
import userLikePage from "./components/userPage/userLikePage.js";
import userModifyPage from "./components/userPage/userModifyPage.js";
import userOrderSheetPage from "./components/userPage/userOrderSheetPage.js";
import handleCouponButton from "./userCoupon/coupon.js";
import handleSearchInput from "./userHeader/handleSearchInput.js";
import { swiperAction, sidebarAction } from "./library/swiper.js";
import goToTopFn from "./library/toTop.js";
import loginEvent from "./userLogin/login.js";
import { changeHeader } from "./userMain/changeHeader.js";
import setProductPage from "./userProduct/setProductPage.js";
import setResultPage from "./userSearch/searchResult.js";
import signUpEvent from "./userSignup/signup.js";
import { setSidebarSwiper } from "./userSidebar/sidebar.js";
import { setProductDetailPage } from "./userProduct/setProductDetailPage.js";
import setCartPage from "./userCart/setCartPage.js";

import setProductList from "./userMain/setProductList.js";
import setSidebarStyle from "./userSidebar/setSidebarStyle.js";
import { setOrderListPage } from "./userOrderList/orderList.js";
import { setAccountPage } from "./userAccount/account.js";
import { setLikePage } from "./userLike/like.js";
import { setModifyPage } from "./userPersonalInfoModify/personalInfoModify.js";
import { setOrderSheetPage } from "./userOrderSheet/orderSheet.js";
import { setProfile } from "./userProfile/profile.js";
import { toggleClass } from "./adminProductList/adminGoodsPage.js";
import { chartFn } from "./library/chart.js";

import report_page from "./adminPages/reportPage.js";
import product_page from "./adminPages/productPage.js";
import add_product_page from "./adminPages/addProductPage.js";
import product_detail_page from "./adminPages/productDetailPage.js";
import product_edit_page from "./adminPages/productEditPage.js";
import transaction_page from "./adminPages/transactionPage.js";
import transaction_detail_page from "./adminPages/detailTransacitonPage.js";

import { pagination } from "./adminProductList/pagination.js";
import { renderDetailPage } from "./adminDetailProducd/renderDetailProduct.js";
import { renderEditDetailPage } from "./adminEditProduct/editProduct.js";
import { renderAddPage } from "./adminAddProduct/addPodouct.js";
import { transactionPagination } from "./adminTransactionList/transactionPagination.js";
import { renderDetailTransactionPage } from "./adminDetailTransaction/renderDetailTransaction.js";
import { renderReportStatus } from "./adminReport/renderStoreStatus.js";
import { requestLogout } from "./api/requestLogout.js";
import { getLocalStorageData } from "./localStorage/getLocalStorageData.js";

const mainRouter = new Navigo("/");
const body = document.querySelector("body");

// 처음 페이지가 로드 되었을 때
mainRouter.link("/");
body.innerHTML = userWrapper;
mainRouter.hooks({
  after: () => {
    window.scroll(0, 0);
  },
});
mainRouter
  .on({
    "/": async () => {
      body.innerHTML = userWrapper;
      document.querySelector("#main").innerHTML = userMainPage;
      setSidebarSwiper(mainRouter);
      // search input
      handleSearchInput(mainRouter);
      // to-top-button
      goToTopFn();
      setProductList(mainRouter);
      swiperAction();
      sidebarAction();
      setSidebarStyle(500);
      const logoButton = document.querySelector("#userWrapper .logo");
      logoButton.addEventListener("click", (event) => {
        event.preventDefault();
        mainRouter.navigate("/");
      });

      const isLogin = await checkAuthorization();
      if (isLogin) {
        const loginId = getLocalStorageData("loginId");
        if (loginId === "admin@paldo.com") {
          mainRouter.navigate("admin");
        } else {
          changeHeader(mainRouter);
        }
      }
    },
    login: async () => {
      document.querySelector("#main").innerHTML = userLoginPage;
      loginEvent(mainRouter);
    },
    signup: () => {
      document.querySelector("#main").innerHTML = userSignupPage;
      signUpEvent();
      setSidebarStyle(100);
    },
    "search/:id": async ({ data }) => {
      document.querySelector("#main").innerHTML = userSearchPage;
      await setResultPage(data.id, mainRouter);
      setSidebarStyle(100);
    },
    coupon: () => {
      document.querySelector("#main").innerHTML = userCouponPage;
      handleCouponButton(mainRouter);
      setSidebarStyle(100);
    },
    "productDetail/:id": async ({ data }) => {
      document.querySelector("#main").innerHTML = userProductDetailPage;
      await setProductDetailPage(data.id, mainRouter);
      setSidebarStyle(100);
    },
    "products/:id": async ({ data }) => {
      document.querySelector("#main").innerHTML = userProductPage;
      await setProductPage(data.id, mainRouter);
      setSidebarStyle(100);
    },
    cart: () => {
      document.querySelector("#main").innerHTML = userCartPage;
      setCartPage(mainRouter);
      setSidebarStyle(100);
    },
    "mypage/orderList": async () => {
      document.querySelector("#main").innerHTML = userOrderListPage;
      const isValidUser = await checkAuthorization();
      setSidebarStyle(100);
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
      document.querySelector("#main").innerHTML = userAccountPage;
      setSidebarStyle(100);
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
      document.querySelector("#main").innerHTML = userLikePage;
      setSidebarStyle(100);
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
      document.querySelector("#main").innerHTML = userModifyPage;
      setSidebarStyle(100);
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
      document.querySelector("#main").innerHTML = userOrderSheetPage;
      setSidebarStyle(100);
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
  .notFound(() => {
    console.log("not found");
  })
  .resolve();
