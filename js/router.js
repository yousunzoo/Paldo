import Navigo from "navigo"; // When using ES modules.
import { checkAuthorization } from "./api/checkAuthorization";
import userWrapper from "./components/wrappers/userWrapper";
import adminWrapper from "./components/wrappers/adminWrapper";
import userMainPage from "./components/userPage/userMainPage";
import userLoginPage from "./components/userPage/userLoginPage";
import userSignupPage from "./components/userPage/userSignupPage";
import userSearchPage from "./components/userPage/userSearchPage";
import userCouponPage from "./components/userPage/userCouponPage";
import userProductPage from "./components/userPage/userProductPage";
import userProductDetailPage from "./components/userPage/userProductDetailPage";
import userCartPage from "./components/userPage/userCartPage";
import userOrderListPage from "./components/userPage/userOrderListPage";
import userAccountPage from "./components/userPage/userAccountPage";
import userLikePage from "./components/userPage/userLikePage";
import userModifyPage from "./components/userPage/userModifyPage";
import userOrderSheetPage from "./components/userPage/userOrderSheetPage";
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
import { requestLogout } from "./api/requestLogout";
import { getLocalStorageData } from "./localStorage/getLocalStorageData";

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
        const loginId = getLocalStorageData("loginId");
        if (loginId === "admin@paldo.com") {
          mainRouter.navigate("admin");
        } else {
          changeHeader(mainRouter);
        }
      }
    },
    login: async () => {
      const sidebarArea = document.querySelector("#sidebar-area");
      document.querySelector("#main").innerHTML = userLoginPage;
      loginEvent(mainRouter);
      sidebarArea.style.paddingTop = "100px";
    },
    signup: () => {
      const sidebarArea = document.querySelector("#sidebar-area");
      document.querySelector("#main").innerHTML = userSignupPage;
      signUpEvent();
      sidebarArea.style.paddingTop = "100px";
    },
    "search/:id": async ({ data }) => {
      const sidebarArea = document.querySelector("#sidebar-area");

      document.querySelector("#main").innerHTML = userSearchPage;
      await setResultPage(data.id, mainRouter);
      sidebarArea.style.paddingTop = "100px";
    },
    coupon: () => {
      const sidebarArea = document.querySelector("#sidebar-area");
      document.querySelector("#main").innerHTML = userCouponPage;
      handleCouponButton(mainRouter);
      sidebarArea.style.paddingTop = "100px";
    },
    "productDetail/:id": async ({ data }) => {
      const sidebarArea = document.querySelector("#sidebar-area");

      document.querySelector("#main").innerHTML = userProductDetailPage;
      await setProductDetailPage(data.id, mainRouter);
      sidebarArea.style.paddingTop = "100px";
    },
    "products/:id": async ({ data }) => {
      const sidebarArea = document.querySelector("#sidebar-area");

      document.querySelector("#main").innerHTML = userProductPage;
      await setProductPage(data.id, mainRouter);
      sidebarArea.style.paddingTop = "100px";
    },
    cart: () => {
      const sidebarArea = document.querySelector("#sidebar-area");

      document.querySelector("#main").innerHTML = userCartPage;
      setCartPage(mainRouter);
      sidebarArea.style.paddingTop = "100px";
    },
    "mypage/orderList": async () => {
      document.querySelector("#main").innerHTML = userOrderListPage;
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
      document.querySelector("#main").innerHTML = userAccountPage;
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
