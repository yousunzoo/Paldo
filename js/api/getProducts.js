import { headers, url } from "./headers";

export async function getProducts(tag) {
  const res = await fetch(
    `${url}products/search
  `,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ searchTags: tag }),
    }
  )
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
