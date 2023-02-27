import { memoizedGetProduct } from "../api/getProduct";
import { memoizedGetTransactions } from "../api/getTransactions";

export const productCount = async () => {
  return memoizedGetProduct().then((productList) => {
    const all = productList.length;
    const snack = productList.reduce(
      (count, item) => count + Number(item.tags.includes("스낵") === true),
      0
    );
    const ramen = productList.reduce(
      (count, item) => count + Number(item.tags.includes("라면") === true),
      0
    );
    const drink = productList.reduce(
      (count, item) => count + Number(item.tags.includes("음료") === true),
      0
    );
    const chocolate = productList.reduce(
      (count, item) => count + Number(item.tags.includes("초콜릿/캔디류") === true),
      0
    );
    const popularity = productList.reduce(
      (count, item) => count + Number(item.tags.includes("인기") === true),
      0
    );
    const newitem = productList.reduce(
      (count, item) => count + Number(item.tags.includes("신상") === true),
      0
    );
    const sale = productList.reduce(
      (count, item) => count + Number(item.tags.includes("세일") === true),
      0
    );
    return [all, snack, ramen, drink, chocolate, popularity, newitem, sale];
  });
};

export const transactionsCount = async () => {
  return memoizedGetTransactions().then((transactionsList) => {
    const all = transactionsList.length;
    const snack = transactionsList.reduce(
      (count, item) => count + Number(item.product.tags.includes("스낵") === true),
      0
    );
    const ramen = transactionsList.reduce(
      (count, item) => count + Number(item.product.tags.includes("라면") === true),
      0
    );
    const drink = transactionsList.reduce(
      (count, item) => count + Number(item.product.tags.includes("음료") === true),
      0
    );
    const chocolate = transactionsList.reduce(
      (count, item) => count + Number(item.product.tags.includes("초콜릿/캔디류") === true),
      0
    );
    const popularity = transactionsList.reduce(
      (count, item) => count + Number(item.product.tags.includes("인기") === true),
      0
    );
    const newitem = transactionsList.reduce(
      (count, item) => count + Number(item.product.tags.includes("신상") === true),
      0
    );
    const sale = transactionsList.reduce(
      (count, item) => count + Number(item.product.tags.includes("세일") === true),
      0
    );
    return [all, snack, ramen, drink, chocolate, popularity, newitem, sale];
  });
};
