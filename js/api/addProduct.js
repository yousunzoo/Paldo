import { headers } from "./headers";

const url = "https://asia-northeast3-heropy-api.cloudfunctions.net/api/products";

export const addProduct = async (payload) => {
  const { title, price, description, tags, thumbnailBase64, photoBase64, discountRate } = payload;
  console.log(thumbnailBase64);
  console.log(photoBase64);

  const res = await fetch(url, {
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
  console.log(result);
};
