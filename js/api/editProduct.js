import { headers, url } from "./headers";

export const editProduct = async (payload, id) => {
  try {
    const {
      title,
      price,
      description,
      tags,
      thumbnailBase64,
      photoBase64,
      isSoldOut,
      discountRate,
    } = payload;
    const res = await fetch(`${url}products/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        title,
        price,
        description,
        tags,
        thumbnailBase64,
        photoBase64,
        isSoldOut,
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
