import { headers, url } from "./headers";

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
    const res = await fetch(`${url}products/transactions/all`, {
      method: "GET",
      headers,
    });
    const json = await res.json();
    return json;
  } catch (error) {}
};
