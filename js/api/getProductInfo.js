import { headers, url } from "./headers";

export async function getProductInfo(id) {
  const res = await fetch(`${url}products/${id}`, {
    headers,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
}
