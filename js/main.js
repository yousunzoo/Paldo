// import { pagination } from "./admin_goodsList/pagination";
import { pagination } from "./admin_goodsList/pagination";
import { ulEl } from "./admin_goodsList/renderGoodsList";
import { checkAuthorization } from "./api/checkAuthorization";
window.onload = async function () {
  const isLogin = await checkAuthorization();
};

const categoryBtn = document.querySelector(".btn-category");
const categoryList = document.querySelector(".category-list");
const soldoutBtn = document.querySelector(".btn-soldout");
const soldoutList = document.querySelector(".soldout-list");

const toggleClass = (btn, list) => {
  btn.addEventListener("click", () => {
    list.classList.contains("active") ? list.classList.remove("active") : list.classList.add("active");
  });
  btn.addEventListener("focusout", () => {
    list.classList.remove("active");
  });
};

toggleClass(categoryBtn, categoryList);
toggleClass(soldoutBtn, soldoutList);

window.addEventListener("click", (e) => {
  if (e.target.className !== "list-tag") return;
  ulEl.innerHTML = "";
  pagination(e.target.textContent);
});

let search;
pagination(search);

// 검색 버튼 입력 했을때
const inputEl = document.querySelector(".search-goodsname");
const inputBtnEl = document.querySelector(".search");
inputEl.addEventListener("keydown", () => {
  if (event.key === "Enter" && !event.isComposing) {
    search = inputEl.value;
    pagination(search);
  }
});

inputBtnEl.addEventListener("click", (e) => {
  search = inputEl.value;
  pagination(search);
});

const allCheck = document.querySelector(".all-check input");
const itemCheck = document.querySelectorAll(".item-check input");
console.log(itemCheck);

window.addEventListener("DOMContentLoaded", (e) => {
  allCheck.addEventListener("click", (e) => {
    console.log(itemCheck);
  });
});
