import { headers } from "./headers";

export const editProduct = async (payload, id) => {
  console.log(payload);
  const { title, price, description, tags, thumbnailBase64, photoBase64, isSoldOut, discountRate } = payload;
  const res = await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${id}`, {
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
  console.log(result);
};
