import { addCheckboxFunctionality, checkAll, checkDelete } from "./checkDelete.js";
import { renderProductList } from "./renderProductList.js";

// 페이지네이션
export const productPagination = (filterRes, router) => {
  let isRendered = false;
  if (filterRes === undefined) return;
  let { arr, totalCount } = filterRes;
  const ulEl = document.querySelector(".product-list");
  const paginationEl = document.querySelector(".pagination");
  let limit = 10;
  let currentPage = 1;
  let pageNum = "";
  let totalPage = Math.ceil(totalCount / limit);

  isRendered = false;
  ulEl.innerHTML = "";

  for (let i = 1; i <= totalPage; i += 1) {
    pageNum += `<button class="pageNumber" id="page_${i}">${i}</button>`;
  }

  paginationEl.innerHTML = pageNum;

  const currentPageNums = document.querySelectorAll(".pagination button");
  currentPageNums.forEach((button) => {
    button.addEventListener("click", () => {
      currentPage = button.innerText;
      ulEl.innerHTML = "";
      renderProductList(router, arr[currentPage - 1], (currentPage - 1) * 10 + 1);
      itemCheck = document.querySelectorAll(".item-check input");
      addCheckboxFunctionality();
      checkAll(allCheck, itemCheck);
      checkDelete(ulEl, deleteButton, itemCheck, router);
    });
  });

  if (isRendered === false) {
    renderProductList(router, arr[currentPage - 1]);
    isRendered = true;
  }

  let allCheck = document.querySelector(".all-check input");
  let itemCheck = document.querySelectorAll(".item-check input");
  let deleteButton = document.querySelector(".delete-button");

  addCheckboxFunctionality();
  checkAll(allCheck, itemCheck);
  checkDelete(ulEl, deleteButton, itemCheck, router);
};
