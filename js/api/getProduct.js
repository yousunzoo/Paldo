import { headers, url } from "./headers";

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
    const res = await fetch(`${url}products`, {
      method: "GET",
      headers,
    });
    const json = await res.json();
    return json;
  } catch (error) {
    Swal.fire({
      icon: "error",
      text: "요청이 실패했습니다!",
    });
  }
};
