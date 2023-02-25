import { SORT_TYPES, getLocalStorageData } from '../localStorage/getLocalStorageData.js';
import { headers, url } from "../api/headers.js";

const { ACCESS_TOKEN } = SORT_TYPES;

export async function getOrderList() {
  const accessToken = getLocalStorageData(ACCESS_TOKEN);
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

export async function cancelTransaction(body) {
  const accessToken = getLocalStorageData(ACCESS_TOKEN);
  const res = fetch(`${url}products/cancel`, {
    method: 'POST',
    headers : {
      ...headers,
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(body)
  })
  .then((result) => {
    return result.json();
  })
  .catch((err) => {
    console.log(err)
  })
  return res;
}

export async function confirmTransaction(body) {
  const accessToken = getLocalStorageData(ACCESS_TOKEN);
  const res = fetch(`${url}products/ok`, {
    method: 'POST',
    headers : {
      ...headers,
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(body)
  })
  .then((result) => {
    return result.json();
  })
  .catch((err) => {
    console.log(err)
  })
  return res;
}