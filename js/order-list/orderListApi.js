import { SORT_TYPES, getDataFromLocalStorage } from '../order-sheet/utils/localStorage.js';
import { headers, url } from "../api/headers.js";

const { ACCESS_TOKEN } = SORT_TYPES;

export async function getOrderList() {
  const accessToken = getDataFromLocalStorage(ACCESS_TOKEN);
  const res = fetch(`${url}products/transactions/details`, {
    headers : {
        ...headers,
        Authorization: `Bearer ${accessToken}`
      }
  })
  .then((result) => {
    if(!result.ok) {
      throw new Error(result);
    }
    return result.json();
  })
  .catch((err) => {
    console.clear()
    return [];
  })
  return res;
}