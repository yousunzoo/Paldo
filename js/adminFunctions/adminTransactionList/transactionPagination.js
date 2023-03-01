import { renderTransactionsList } from "./renderTransactionsList.js";
let isRendered = false;
let limit = 10;
let currentPage = 1;

export const transactionPagination = async (filterRes, router) => {
  if (filterRes === undefined) return;
  let { arr, totalCount } = filterRes;
  const transactionList = document.querySelector(".transaction-list");
  let paginationEl = document.querySelector(".pagination-transaction");
  let pageNum = "";
  let totalPage = Math.ceil(totalCount / limit);

  isRendered = false;
  transactionList.innerHTML = "";

  for (let i = 1; i <= totalPage; i += 1) {
    pageNum += `<button class="pageNumber" id="page_${i}">${i}</button>`;
  }

  paginationEl.innerHTML = pageNum;

  const currentPageNums = document.querySelectorAll(".pagination-transaction button");
  currentPageNums.forEach((button) => {
    button.addEventListener("click", () => {
      currentPage = button.innerText;
      transactionList.innerHTML = "";
      renderTransactionsList(router, arr[currentPage - 1], (currentPage - 1) * 10 + 1);
    });
  });

  if (isRendered === false) {
    renderTransactionsList(router, arr[currentPage - 1]);
    isRendered = true;
  }
  const loader = document.querySelector(".loader-wrapper");
  loader.style.display = "none";
};
