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
import userPaymentPage from "./components/userPage/userPaymentPage.js";
import paymentCompletePage from "./components/userPage/paymentCompletePage";
import handleCouponButton from "./userCoupon/coupon.js";
import handleSearchInput from "./userHeader/handleSearchInput.js";
import { swiperAction, sidebarAction } from "./library/swiper.js";
import goToTopFn from "./library/toTop.js";
import loginEvent from "./userLogin/login.js";
import { changeHeader } from "./userMain/changeHeader.js";
import setProductPage from "./userProduct/setProductPage.js";
import setResultPage from "./userSearch/searchResult.js";
import signUpEvent from "./userSignup/signup.js";
import setSidebarSwiper from "./userSidebar/setSidebarSwiper.js";
import { setProductDetailPage } from "./userProduct/setProductDetailPage.js";
import setCartPage from "./userCart/setCartPage.js";

import setProductList from "./userMain/setProductList.js";
import setSidebarStyle from "./userSidebar/setSidebarStyle.js";
import { setOrderListPage } from "./userOrderList/orderList.js";
import { setAccountPage } from "./userAccount/account.js";
import { setLikePage } from "./userLike/like.js";
import { setModifyPage } from "./userModify/personalInfoModify.js";
import { setPaymentPage } from "./userPayment/payment.js";
import setPaymentCompletePage from "./userPaymentComplete/paymentComplete.js";
import { setProfile } from "./userProfile/profile.js";
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
import { renderDetailTransactionPage } from "./adminDetailTransaction/renderDetailTransaction.js";
import { renderReportStatus } from "./adminReport/renderStoreStatus.js";
import { requestLogout } from "./api/requestLogout";
import { searchTransaction } from "./adminTransactionList/searchTransaction";
import { pickr } from "./library/pickr";
import { memoizedGetProduct } from "./api/getProduct";
import { productFilterList } from "./adminProductList/productFilter";
import { memoizedGetTransactions } from "./api/getTransactions";
import { transctionFilterList } from "./adminTransactionList/transctionFilter";

import { getLocalStorageData } from "./localStorage/getLocalStorageData.js";

const mainRouter = new Navigo("/");
const body = document.querySelector("body");

// 처음 페이지가 로드 되었을 때
(async () => {
  body.innerHTML = userWrapper;
  setSidebarSwiper(mainRouter);
  handleSearchInput(mainRouter);
  goToTopFn();
  swiperAction();
  sidebarAction();
  setSidebarStyle(500);
  mainRouter.link("/");
  const isLogin = await checkAuthorization();
  if (isLogin) {
    const loginId = getLocalStorageData("loginId");
    if (loginId === "admin@paldo.com") {
      mainRouter.navigate("admin");
    } else {
      changeHeader(mainRouter);
    }
  }
})();

mainRouter.hooks({
  async before(done, match) {
    window.scrollTo(0, 0);
    const requiredLogInPaths = ["cart", "mypage/orderList", "mypage/account", "mypage/modify", "mypage/like", "payment"];
    if (requiredLogInPaths.includes(match.url)) {
      const isLogin = await checkAuthorization();
      if (!isLogin) {
        Swal.fire({
          icon: "info",
          title: "로그인이 필요한 서비스입니다.",
          text: "로그인 페이지로 이동합니다.",
        }).then(() => {
          mainRouter.navigate("/login");
          done();
        });
      }
    }
    done();
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
    "mypage/orderList": () => {
      document.querySelector("#main").innerHTML = userOrderListPage;
      setProfile();
      setOrderListPage(mainRouter);
      setSidebarStyle(500);
    },
    "mypage/account": () => {
      document.querySelector("#main").innerHTML = userAccountPage;
      setProfile();
      setAccountPage(mainRouter);
      setSidebarStyle(500);
    },
    "mypage/like": () => {
      document.querySelector("#main").innerHTML = userLikePage;
      setProfile();
      setLikePage();
      setSidebarStyle(500);
    },
    "mypage/modify": () => {
      document.querySelector("#main").innerHTML = userModifyPage;
      setProfile();
      setModifyPage(mainRouter);
    },
    payment: () => {
      document.querySelector("#main").innerHTML = userPaymentPage;
      setPaymentPage(mainRouter);
      swiperAction();
    },
    paymentComplete: () => {
      document.querySelector("#main").innerHTML = paymentCompletePage;
      setPaymentCompletePage();
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
