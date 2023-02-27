import { headers, url } from "./headers";

export const addProduct = async (payload) => {
  try {
    const { title, price, description, tags, thumbnailBase64, photoBase64, discountRate } = payload;
    const res = await fetch(`${url}products`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        title,
        price,
        description,
        tags,
        thumbnailBase64,
        photoBase64,
        discountRate,
      }),
    });
    const result = await res.json();
  } catch {
    Swal.fire({
      icon: "error",
      text: "요청이 실패했습니다!",
    });
  }
};
