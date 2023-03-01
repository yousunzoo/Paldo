import Navigo from "navigo"; // When using ES modules.
import { checkAuthorization } from "./api/checkAuthorization.js";
import userWrapper from "./components/wrappers/userWrapper.js";
import adminWrapper from "./components/wrappers/adminWrapper.js";
import userMainPage from "./components/userPages/userMainPage.js";
import userLoginPage from "./components/userPages/userLoginPage.js";
import userSignupPage from "./components/userPages/userSignupPage.js";
import userSearchPage from "./components/userPages/userSearchPage.js";
import userCouponPage from "./components/userPages/userCouponPage.js";
import userProductPage from "./components/userPages/userProductPage.js";
import userProductDetailPage from "./components/userPages/userProductDetailPage.js";
import userCartPage from "./components/userPages/userCartPage.js";
import userOrderListPage from "./components/userPages/userOrderListPage.js";
import userAccountPage from "./components/userPages/userAccountPage.js";
import userLikePage from "./components/userPages/userLikePage.js";
import userModifyPage from "./components/userPages/userModifyPage.js";
import userPaymentPage from "./components/userPages/userPaymentPage.js";
import paymentCompletePage from "./components/userPages/paymentCompletePage";
import handleCouponButton from "./userFunctions/userCoupon/coupon.js";
import handleSearchInput from "./userFunctions/userHeader/handleSearchInput.js";
import { swiperAction, sidebarAction } from "./library/swiper.js";
import goToTopFn from "./library/toTop.js";
import loginEvent from "./userFunctions/userLogin/login.js";
import { changeHeader } from "./userFunctions/userMain/changeHeader.js";
import setProductPage from "./userFunctions/userProduct/setProductPage.js";
import setResultPage from "./userFunctions/userSearch/searchResult.js";
import signUpEvent from "./userFunctions/userSignup/signup.js";
import setSidebarSwiper from "./userFunctions/userSidebar/setSidebarSwiper.js";
import { setProductDetailPage } from "./userFunctions/userProduct/setProductDetailPage.js";
import setCartPage from "./userFunctions/userCart/setCartPage.js";

import setProductList from "./userFunctions/userMain/setProductList.js";
import setSidebarStyle from "./userFunctions/userSidebar/setSidebarStyle.js";
import { setOrderListPage } from "./userFunctions/userOrderList/orderList.js";
import { setAccountPage } from "./userFunctions/userAccount/account.js";
import { setLikePage } from "./userFunctions/userLike/like.js";
import { setModifyPage } from "./userFunctions/userModify/personalInfoModify.js";
import { setPaymentPage } from "./userFunctions/userPayment/payment.js";
import setPaymentCompletePage from "./userFunctions/userPaymentComplete/paymentComplete.js";
import { setProfile } from "./userFunctions/userProfile/profile.js";
import { chartFn } from "./library/chart.js";

import notFoundPage from "./components/notFoundPage";
import adminReportPage from "./components/adminPages/adminReportPage";
import adminProductListPage from "./components/adminPages/adminProductListPage";
import adminAddProductPage from "./components/adminPages/adminAddProductPage";
import adminProductDetailPage from "./components/adminPages/adminProductDetailPage";
import adminProductEditPage from "./components/adminPages/adminProductEditPage";
import adminTransactionPage from "./components/adminPages/adminTransactionPage";
import adminTransactionDetailPage from "./components/adminPages/adminTransactionDetailPage";

import { productPagination } from "./adminFunctions/adminProductList/productPagination";
import { productPageButton } from "./adminFunctions/adminProductList/productPageFunc";
import { renderEditDetailPage } from "./adminFunctions/adminEditProduct/editProduct.js";
import { renderDetailPage } from "./adminFunctions/adminDetailProduct/renderDetailProduct.js";

import { renderAddPage } from "./adminFunctions/adminAddProduct/addPodouct.js";
import { transactionPagination } from "./adminFunctions/adminTransactionList/transactionPagination.js";
import { renderDetailTransactionPage } from "./adminFunctions/adminDetailTransaction/renderDetailTransaction.js";
import { renderReportStatus } from "./adminFunctions/adminReport/renderStoreStatus.js";
import { requestLogout } from "./api/requestLogout";
import { searchTransaction } from "./adminFunctions/adminTransactionList/searchTransaction";
import { pickr } from "./library/pickr";
import { getProduct, memoizedGetProduct } from "./api/getProduct";
import { productFilterList } from "./adminFunctions/adminProductList/productFilter";
import { getTransactions, memoizedGetTransactions } from "./api/getTransactions";
import { transctionFilterList } from "./adminFunctions/adminTransactionList/transctionFilter";

import { getLocalStorageData } from "./utils/localStorage/getLocalStorageData.js";
import { productCount, transactionsCount } from "./adminFunctions/adminReport/getCountData.js";

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
    const requiredLogInPaths = [
      "cart",
      "mypage/orderList",
      "mypage/account",
      "mypage/modify",
      "mypage/like",
      "payment",
    ];
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
      setSidebarStyle(0);
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
      setSidebarStyle(500);
    },
    payment: () => {
      document.querySelector("#main").innerHTML = userPaymentPage;
      setPaymentPage(mainRouter);
      swiperAction();
      setSidebarStyle(100);
    },
    paymentComplete: () => {
      document.querySelector("#main").innerHTML = paymentCompletePage;
      setPaymentCompletePage();
      setSidebarStyle(100);
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
            const loader = document.querySelector(".loader-wrapper");
            loader.style.display = "flex";
            const transaction = await memoizedGetTransactions();
            const products = await memoizedGetProduct();
            const bar = productCount(products);
            const pie = transactionsCount(transaction);
            renderReportStatus();
            chartFn(bar, pie);
            renderReportStatus();
          },
          "product/": async () => {
            document.querySelector("#content").innerHTML = adminProductListPage;
            let search;
            const listEls = await getProduct();
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
            const loader = document.querySelector(".loader-wrapper");
            loader.style.display = "flex";
            let search;
            const listEls = await getTransactions();
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
