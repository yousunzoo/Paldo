import { headers, url } from "./headers";

export const getDetailProduct = async (id) => {
  try {
    const res = await fetch(`${url}products/${id}`, {
      method: "GET",
      headers,
    });
    if (!res.ok) throw new Error(res.status);
    const json = await res.json();
    return json;
  } catch (error) {
    return false;
  }
};
