import { pagination } from "./admin_goodsList/pagination.js";
import { ulEl } from "./admin_goodsList/renderGoodsList.js";
import { checkAuthorization } from "./api/checkAuthorization.js";
import { categoryBtn, categoryList, soldoutBtn, soldoutList, toggleClass } from "../js/admin_goodsList/admin_goods_page.js";
import { addProduct } from "./api/addProduct.js";
import { addBtnClick } from "./amdin_add/admin_add_page.js";
// window.onload = async function () {
//   const isLogin = await checkAuthorization();
// };

// toggleClass(categoryBtn, categoryList);
// toggleClass(soldoutBtn, soldoutList);

// window.addEventListener("click", (e) => {
//   if (e.target.className !== "list-tag") return;
//   ulEl.innerHTML = "";
//   pagination(e.target.textContent);
// });

// let search;
// pagination(search);

// // 검색 버튼 입력 했을때
// const inputEl = document.querySelector(".search-goodsname");
// const inputBtnEl = document.querySelector(".search");
// inputEl.addEventListener("keydown", () => {
//   if (event.key === "Enter" && !event.isComposing) {
//     search = inputEl.value;
//     pagination(search);
//   }
// });

// inputBtnEl.addEventListener("click", (e) => {
//   search = inputEl.value;
//   pagination(search);
// });

const res_btn = document.querySelector(".res-btn");
res_btn.addEventListener("click", addBtnClick);
