import { transactionPagination } from "../adminFunctions/adminTransactionList/transactionPagination";
import { transctionFilterList } from "../adminFunctions/adminTransactionList/transctionFilter";
import { memoizedGetTransactions } from "../api/getTransactions";
export const pickr = (router) => {
  flatpickr("#myDatepicker", {
    dateFormat: "Y-m-d", // set the date format
    disableMobile: true, // disable mobile optimizations
  });
  const pickerEl = document.querySelector(".flatpickr-input");
  pickerEl.addEventListener("change", async () => {
    const listEls = await memoizedGetTransactions();
    const filterRes = transctionFilterList(listEls, pickerEl.value);
    transactionPagination(filterRes, router);
  });
};
