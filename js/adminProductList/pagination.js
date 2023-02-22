import { deleteProduct } from "../api/deleteProduct.js";
import { memoizedGetProduct } from "../api/getProduct.js";
import { renderGoodsList } from "./renderGoodsList.js";

let limit = 10;
let currentPage = 1;
let tagList = ["초콜릿/캔디류", "라면", "음료", "스낵", "인기", "세일", "신상"];
let boolean = ["YES", "NO"];
let allCheck;
let itemCheck;
let deletebutton;
let isRendered = false;

export const pagination = async (search = undefined, router) => {
  isRendered = false;
  const ulEl = document.querySelector(".goods-list");
  window.addEventListener("click", (e) => {
    if (e.target.className !== "list-tag") return;
    ulEl.innerHTML = "";
    pagination(e.target.textContent);
  });
  let paginationEl = document.querySelector(".pagination");

  let listEls = await memoizedGetProduct();

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
    if (arr === undefined) return;
    totalCount = arr.length * 10;
  }
  ulEl.innerHTML = "";

  let totalPage = Math.ceil(totalCount / limit);
  router;

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
      renderGoodsList(router, arr[currentPage - 1], (currentPage - 1) * 10 + 1);
      itemCheck = document.querySelectorAll(".item-check input");
    });
  });

  if (isRendered === false) {
    renderGoodsList(router, arr[currentPage - 1]);
    isRendered = true;
  }

  allCheck = document.querySelector(".all-check input");
  itemCheck = document.querySelectorAll(".item-check input");
  deletebutton = document.querySelector(".delete-button");

  // 전체체크
  allCheck.addEventListener("click", () => {
    let isChecked = allCheck.checked;
    if (true) {
      itemCheck.forEach((item) => (item.checked = isChecked));
    }
  });

  // 선택삭제
  deletebutton.addEventListener("click", async () => {
    itemCheck = document.querySelectorAll(".item-check input");
    let count = 0;
    let checkList = [];
    itemCheck.forEach((item) => {
      if (item.closest("input").checked) {
        count++;
        checkList.push(item);
      }
    });
    console.log(count);
    if (count < 1) {
      Swal.fire(
        "선택한 항목이 없습니다.",
        "삭제할 상품을 선택해주세요.",
        "question"
      );
      return;
    } else {
      for (const item of checkList) {
        deleteProduct(item.closest(".item").getAttribute("data-id"));
      }
      isRendered = false;
      ulEl.innerHTML = "";
      pagination();
    }
  });
};

// 카테고리 필터링
const filterByTag = (listEls, search) => {
  const searchFilters = listEls.filter((item) => item.tags.includes(search));
  const arr = Array(Math.ceil(searchFilters.length / 10)).fill([]);
  let num = 0;
  for (let i in arr) {
    arr[i] = searchFilters.slice(num, num + 10);
    num += 10;
    isRendered = false;
  }
  return arr;
};

// 품절여부 필터링
const filterByBoolean = (listEls, search) => {
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
    isRendered = false;
  }
  return arr;
};

// 검색어 필터링
const filterBySearch = (listEls, search) => {
  isRendered = false;
  const searchFilters = listEls.filter((item) => item.title.includes(search));
  const arr = Array(Math.ceil(searchFilters.length / 10)).fill([]);

  if (searchFilters.length === 0) {
    Swal.fire({
      icon: "error",
      title: "검색어를 확인해주세요.",
      text: "검색한 제품명은 찾을 수 없습니다.",
    });
    return;
  }

  let num = 0;
  for (let i in arr) {
    arr[i] = searchFilters.slice(num, num + 10);
    num += 10;
  }
  return arr;
};

// 전체목록
const filterAll = (listEls) => {
  const arr = Array(Math.ceil(listEls.length / 10)).fill([]);
  let num = 0;
  for (let i in arr) {
    arr[i] = listEls.slice(num, num + 10);
    num += 10;
  }
  return arr;
};
