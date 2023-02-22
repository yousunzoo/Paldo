import { makeDOMwithProperties } from "../utils/dom.js";
export const renderTransactionsList = async (router, itemListData, no) => {
  const transactionList = document.querySelector(".transaction-list");
  if (no === undefined) {
    no = 1;
  } else {
    no = no;
  }
  if (itemListData.length === undefined) return;
  const itemEls = itemListData.map((item) => {
    const liEl = makeDOMwithProperties("li", {
      className: "item-wrapper",
    });
    const itemEl = makeDOMwithProperties("a", {
      className: "item-transaction",
    });
    const itemNo = makeDOMwithProperties("div", {
      className: "info item-no",
    });

    const itemName = makeDOMwithProperties("div", {
      className: "info item-name",
    });
    const itemPrice = makeDOMwithProperties("div", {
      className: "info item-price",
    });
    const itemCoustmer = makeDOMwithProperties("div", {
      className: "info item-coustmer",
    });
    const itemBank = makeDOMwithProperties("div", {
      className: "info item-bank",
    });
    const itemTime = makeDOMwithProperties("div", {
      className: "info item-time",
    });
    const itemCancel = makeDOMwithProperties("div", {
      className: "info item-cancel",
    });
    const itemConfirm = makeDOMwithProperties("div", {
      className: "info item-confirm",
    });
    itemEl.href = "/transaction/" + item.detailId;
    let koreaTime = new Date(item.timePaid);
    koreaTime.getTime();
    itemNo.textContent = no++;
    itemName.textContent = item.product.title;
    itemPrice.textContent = item.product.price;
    itemCoustmer.textContent = item.user.displayName;
    itemBank.textContent = item.account.bankName;
    itemTime.textContent = koreaTime.toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
    });
    itemCancel.textContent = item.isCanceled;
    itemConfirm.textContent = item.done;
    itemEl.append(itemNo, itemName, itemPrice, itemCoustmer, itemBank, itemTime, itemCancel, itemConfirm);
    liEl.append(itemEl);
    itemEl.addEventListener("click", function (event) {
      event.preventDefault();
      let targetID = this.getAttribute("href");
      router.navigate(targetID, { id: item });
    });
    return liEl;
  });
  transactionList.append(...itemEls);
  return transactionList;
};
