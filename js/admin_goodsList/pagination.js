import { deleteProduct } from "../api/deleteProduct";
import { getProduct } from "../api/getProduct";
import { renderGoodsList, ulEl } from "./renderGoodsList";

export let isRendered = false;

const paginationEl = document.querySelector(".pagination");

let limit = 10;
let currentPage = 1;
let tagList = ["초콜릿/캔디류", "라면", "음료", "스낵", "인기", "세일", "신상"];
let boolean = ["YES", "NO"];
let allCheck;
let itemCheck;
let deleteBtn;
let listEls;
export const pagination = async (search = undefined) => {
  listEls = await getProduct();
  let arr;
  let totalCount;

  if (tagList.includes(search)) {
    arr = filterByTag(listEls, search);
    totalCount = arr.length * 10;
  } else if (boolean.includes(search)) {
    arr = filterByBoolean(listEls, search);
    totalCount = arr.length * 10;
  } else if (search === undefined) {
    arr = filterAll(listEls);
    totalCount = listEls.length;
  } else {
    arr = filterBySearch(listEls, search);
    totalCount = arr.length * 10;
  }

  let totalPage = Math.ceil(totalCount / limit);

  // 첫번째 숫자는 마지막 숫자에서 전체 카운트 - 1

  let html = "";

  for (let i = 1; i <= totalPage; i += 1) {
    html += `<button class="pageNumber" id="page_${i}">${i}</button>`;
  }

  paginationEl.innerHTML = html;

  const currentPageNums = document.querySelectorAll(".pagination button");
  currentPageNums.forEach((button) => {
    button.addEventListener("click", () => {
      currentPage = button.innerText;
      ulEl.innerHTML = "";
      renderGoodsList(arr[currentPage - 1]);
      itemCheck = document.querySelectorAll(".item-check input");
    });
  });

  if (isRendered === false) {
    renderGoodsList(arr[currentPage - 1]);
    isRendered = true;
  }
  allCheck = document.querySelector(".all-check input");
  itemCheck = document.querySelectorAll(".item-check input");
  deleteBtn = document.querySelector(".delete-btn");
  allCheck.addEventListener("click", () => {
    let isChecked = allCheck.checked;
    if (true) {
      itemCheck.forEach((item) => (item.checked = isChecked));
    }
  });
  deleteBtn.addEventListener("click", async () => {
    itemCheck = document.querySelectorAll(".item-check input");
    itemCheck.forEach((item) => {
      if (item.checked) {
        deleteProduct(item.closest(".item").getAttribute("data-id"));
      }
    });

    isRendered = false;
    listEls = await getProduct();
    ulEl.innerHTML = "";
    pagination();
  });
};

// deleteProduct(item.closest(".item"))

export const filterByTag = (listEls, search) => {
  const searchFilters = listEls.filter((item) => item.tags.includes(search));
  const arr = Array(Math.ceil(searchFilters.length / 10)).fill([]);
  let num = 0;
  for (let i in arr) {
    arr[i] = searchFilters.slice(num, num + 10);
    num += 10;
    ulEl.innerHTML = "";
    isRendered = false;
  }
  return arr;
};

// 품절여부 필터링
export const filterByBoolean = (listEls, search) => {
  let yesOrNo;
  if (search === "YES") {
    yesOrNo = true;
  } else {
    yesOrNo = false;
  }
  const searchFilters = listEls.filter((item) => item.isSoldOut === yesOrNo);
  const arr = Array(Math.ceil(searchFilters.length / 10)).fill([]);
  let num = 0;
  for (let i in arr) {
    arr[i] = searchFilters.slice(num, num + 10);
    num += 10;
    ulEl.innerHTML = "";
    isRendered = false;
  }
  return arr;
};

// 검색어 필터링
export const filterBySearch = (listEls, search) => {
  const searchFilters = listEls.filter((item) => item.title.includes(search));
  const arr = Array(Math.ceil(searchFilters.length / 10)).fill([]);
  let num = 0;
  for (let i in arr) {
    arr[i] = searchFilters.slice(num, num + 10);
    num += 10;
    ulEl.innerHTML = "";
    isRendered = false;
  }
  return arr;
};

// 전체목록
export const filterAll = (listEls) => {
  const arr = Array(Math.ceil(listEls.length / 10)).fill([]);
  let num = 0;
  for (let i in arr) {
    arr[i] = listEls.slice(num, num + 10);
    num += 10;
  }
  return arr;
};
