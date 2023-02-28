export const productCount = async (products) => {
  const all = products.length;
  const snack = products.reduce(
    (count, item) => count + Number(item.tags.includes("스낵") === true),
    0
  );
  const ramen = products.reduce(
    (count, item) => count + Number(item.tags.includes("라면") === true),
    0
  );
  const drink = products.reduce(
    (count, item) => count + Number(item.tags.includes("음료") === true),
    0
  );
  const chocolate = products.reduce(
    (count, item) => count + Number(item.tags.includes("초콜릿/캔디류") === true),
    0
  );
  const popularity = products.reduce(
    (count, item) => count + Number(item.tags.includes("인기") === true),
    0
  );
  const newitem = products.reduce(
    (count, item) => count + Number(item.tags.includes("신상") === true),
    0
  );
  const sale = products.reduce(
    (count, item) => count + Number(item.tags.includes("세일") === true),
    0
  );
  return [all, snack, ramen, drink, chocolate, popularity, newitem, sale];
};

export const transactionsCount = async (transaction) => {
  const all = transaction.length;
  const snack = transaction.reduce(
    (count, item) => count + Number(item.product.tags.includes("스낵") === true),
    0
  );
  const ramen = transaction.reduce(
    (count, item) => count + Number(item.product.tags.includes("라면") === true),
    0
  );
  const drink = transaction.reduce(
    (count, item) => count + Number(item.product.tags.includes("음료") === true),
    0
  );
  const chocolate = transaction.reduce(
    (count, item) => count + Number(item.product.tags.includes("초콜릿/캔디류") === true),
    0
  );
  const popularity = transaction.reduce(
    (count, item) => count + Number(item.product.tags.includes("인기") === true),
    0
  );
  const newitem = transaction.reduce(
    (count, item) => count + Number(item.product.tags.includes("신상") === true),
    0
  );
  const sale = transaction.reduce(
    (count, item) => count + Number(item.product.tags.includes("세일") === true),
    0
  );
  return [all, snack, ramen, drink, chocolate, popularity, newitem, sale];
};

export const renderReportStatus = async (products, transaction) => {
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
