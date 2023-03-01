import { headers, url } from "./headers";

export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${url}products/${id}`, {
      method: "DELETE",
      headers,
    });
    const json = await res.json();
    return json;
  } catch {
    Swal.fire({
      icon: "error",
      text: "요청이 실패했습니다!",
    });
  }
};
