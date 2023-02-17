import { headers, url } from "./headers";

export async function getProducts(keyword = "", tag = []) {
  const data = {};
  if (keyword) {
    data.searchText = keyword;
  }
  if (typeof tag === "string") {
    switch (tag) {
      case "new":
        data.searchTags = ["신상"];
        break;
      case "best":
        data.searchTags = ["인기"];
        break;
      case "frugal":
        data.searchTags = ["세일"];
    }
  } else {
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
