import { memoizedGetTransactions } from "../api/getTransactions";
import { transactionPagination } from "./transactionPagination";
import { transctionFilterList } from "./transctionFilter";

export const searchTransaction = (router) => {
  // 검색 버튼 입력 했을때
  const inputEl = document.querySelector(".search-username");
  const inputbuttonEl = document.querySelector(".search");
  inputEl.addEventListener("keyup", async (event) => {
    const listEls = await memoizedGetTransactions();
    if (event.key === "Enter" && !event.isComposing) {
      const filterRes = transctionFilterList(listEls, inputEl.value);
      transactionPagination(filterRes, router);
    }
  });
  inputbuttonEl.addEventListener("click", async () => {
    const listEls = await memoizedGetTransactions();
    const filterRes = transctionFilterList(listEls, inputEl.value);
    transactionPagination(filterRes, router);
  });
};
