import { headers } from "./headers";

const url = "https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/";

export const deleteProduct = async (id) => {
  try {
    const res = await fetch(url + id, {
      method: "DELETE",
      headers,
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
