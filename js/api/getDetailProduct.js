import { headers } from "./headers";

const url =
  "https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/";

export const getDetailProduct = async (id) => {
  try {
    const res = await fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${id}`,
      {
        method: "GET",
        headers,
      }
    );
    const json = await res.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
