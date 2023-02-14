import { headers, url } from "./headers";

export async function getProducts(keyword = "", tag = []) {
  const data = {};
  if (keyword) {
    data.searchText = keyword;
  }
  if (tag.length === 0) {
    data.searchTags = tag;
  }
  const res = await fetch(
    `${url}products/search
  `,
    {
      method: "POST",
      headers,
      body: JSON.stringify(data),
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
