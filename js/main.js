// import { renderGoodsList } from "../js/admin_goodsList/renderGoodsList.js";
// import { ulEl } from "./admin_goodsList/renderGoodsList.js";
// import { checkAuthorization } from "./api/checkAuthorization.js";
// import { categorybutton, categoryList, soldoutbutton, soldoutList, toggleClass } from "../js/admin_goodsList/admin_goods_page.js";
// import { addProduct } from "./api/addProduct.js";
// import { addbuttonClick } from "./amdin_add/admin_add_page.js";
// window.onload = async function () {
//   const isLogin = await checkAuthorization();
// };
import Navigo from "navigo";
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

export const router = new Navigo("/");
router
  .on({
    report: async () => {
      document.querySelector("#content").innerHTML = report_page;
      chartFn();
      renderReportStatus();
    },
  })
  .on({
    product: () => {
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
    "/product/:id": ({ data }) => {
      console.log(data);
      document.querySelector("#content").innerHTML = product_detail_page;
      renderDetailPage(data.id, router);
    },
  })
  .on({
    "editproduct/:id": ({ data }) => {
      document.querySelector("#content").innerHTML = product_edit_page;
      renderEditDetailPage(data.id, router);
    },
  })
  .on({
    registration: () => {
      document.querySelector("#content").innerHTML = add_product_page;
      renderAddPage();
    },
  })
  .on({
    transaction: () => {
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
  })
  .on({
    "/transaction/:id": ({ data }) => {
      document.querySelector("#content").innerHTML = transaction_detail_page;
      renderDetailTransactionPage(data);
    },
  });
router.resolve();
