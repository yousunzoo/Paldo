import { memoizedGetProduct } from "../api/getProduct";
import { memoizedGetTransactions } from "../api/getTransactions";

export const renderReportStatus = async () => {
  const transaction = await memoizedGetTransactions();
  const products = await memoizedGetProduct();

  const all = products.length;
  const isSoldOut = products.reduce((count, item) => count + Number(item.isSoldOut === true), 0);

  const current = document.querySelector(".current-score");
  const soldout = document.querySelector(".soldout-score");
  current.textContent = all + " 건";
  soldout.textContent = isSoldOut + " 건";

  const transactionAll = transaction.length;
  const isCancel = transaction.reduce((count, item) => count + Number(item.isCanceled === true), 0);
  const done = transaction.reduce((count, item) => count + Number(item.done === true), 0);
  const price = transaction.reduce((count, item) => count + Number(item.product.price), 0);

  const order = document.querySelector(".order-score");
  const withdraw = document.querySelector(".withdraw-score");
  const confirmation = document.querySelector(".confirmation-score");
  const sales = document.querySelector(".sales-score");
  order.textContent = transactionAll + " 건";
  withdraw.textContent = isCancel + " 건";
  confirmation.textContent = done + " 건";
  sales.textContent = price.toLocaleString() + " 원";
};
