import { headers } from "./headers";

const url = "https://asia-northeast3-heropy-api.cloudfunctions.net/api/products";

export const memoizedGetProduct = (() => {
  let product;
  return async () => {
    if (!product) {
      product = await getProduct();
    }
    return product;
  };
})();

export const getProduct = async () => {
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
