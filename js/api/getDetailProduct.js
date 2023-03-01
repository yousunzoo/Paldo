import { headers, url } from "./headers";

export const getDetailProduct = async (id) => {
  try {
    const res = await fetch(`${url}products/${id}`, {
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
    return false;
  }
};
