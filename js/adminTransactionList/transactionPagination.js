import { getTransactions } from "../api/getTransactions.js";
import { renderTransactionsList } from "./renderTransactionsList.js";
let isRendered = false;
let limit = 10;
let currentPage = 1;
const regex = /^\d{4}-\d{2}-\d{2}$/;

export const transactionPagination = async (search = undefined, router) => {
  isRendered = false;
  const transactionList = document.querySelector(".transaction-list");
  let paginationEl = document.querySelector(".pagination-transaction");
  let listEls = await getTransactions();
  let arr;
  let totalCount;

  // 시간순으로 정렬
  listEls.sort(function (a, b) {
    return new Date(b.timePaid) - new Date(a.timePaid);
  });

  if (search === undefined) {
    arr = filterAll(listEls);
    totalCount = listEls.length;
  } else if (regex.test(search)) {
    arr = filterByDate(listEls, search);
    // 거래 날짜가 없으면 종료
    if (arr === undefined) return;
    totalCount = arr.length * 10;
  } else {
    arr = filterBySearch(listEls, search);
    // 구매자명이 없으면 종료
    if (arr === undefined) return;
    totalCount = arr.length * 10;
  }

  transactionList.innerHTML = "";

  let totalPage = Math.ceil(totalCount / limit);

  // 첫번째 숫자는 마지막 숫자에서 전체 카운트 - 1

  let html = "";

  for (let i = 1; i <= totalPage; i += 1) {
    html += `<button class="pageNumber" id="page_${i}">${i}</button>`;
  }

  paginationEl.innerHTML = html;

  const currentPageNums = document.querySelectorAll(
    ".pagination-transaction button"
  );
  currentPageNums.forEach((button) => {
    button.addEventListener("click", () => {
      currentPage = button.innerText;
      transactionList.innerHTML = "";
      renderTransactionsList(
        router,
        arr[currentPage - 1],
        (currentPage - 1) * 10 + 1
      );
    });
  });

  if (isRendered === false) {
    renderTransactionsList(router, arr[currentPage - 1]);
    isRendered = true;
  }
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

// 검색어 정렬
const filterBySearch = (listEls, search) => {
  isRendered = false;
  const searchFilters = listEls.filter((item) =>
    item.user.displayName.includes(search)
  );

  if (searchFilters.length === 0) {
    Swal.fire({
      icon: "error",
      title: "구매자명을 확인해주세요.",
      text: "검색한 구매자명은 기록이 없습니다.",
    });
    return;
  }

  const arr = Array(Math.ceil(searchFilters.length / 10)).fill([]);
  let num = 0;
  for (let i in arr) {
    arr[i] = searchFilters.slice(num, num + 10);
    num += 10;
  }
  return arr;
};

// flatfickr 거래날짜 정렬
const filterByDate = (listEls, search) => {
  isRendered = false;
  const searchFilters = listEls.filter((item) => {
    const utcDate = new Date(item.timePaid);
    const krDate = new Date(utcDate.getTime() * 60 * 60 * 1000);
    const formattedDate = krDate.slice(0, 10);
    console.log(formattedDate);
    if (formattedDate === search) {
      return item;
    }
  });

  if (searchFilters.length === 0) {
    Swal.fire({
      icon: "error",
      title: "거래날짜를 확인해주세요.",
      text: "선택된 날짜에는 거래한 기록이 없습니다.",
    });
    return;
  }

  const arr = Array(Math.ceil(searchFilters.length / 10)).fill([]);
  let num = 0;
  for (let i in arr) {
    arr[i] = searchFilters.slice(num, num + 10);
    num += 10;
  }
  return arr;
};
