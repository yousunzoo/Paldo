import { getDataFromLocalStorage } from '../order-sheet/utils/localStorage.js';
import { headers, url } from "../api/headers.js";

export async function getOrderList() {
  const accessToken = getDataFromLocalStorage('accessToken');
  const res = await fetch(`${url}products/transactions/details`, {
    headers : {
      ...headers,
      Authorization: `Bearer ${accessToken}`
    }
  })
  const json = await res.json();
  return json;
}