import { headers } from "./headers";

const url = "https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/all";

export const memoizedGetTransactions = (() => {
  let product;
  return async () => {
    if (!product) {
      product = await getTransactions();
    }
    return product;
  };
})();

export const getTransactions = async () => {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers,
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
