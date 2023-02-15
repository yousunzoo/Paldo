import { getDataFromLocalStorage } from './utils/localStorage.js';
import { headers, url } from "../api/headers.js";

export function requestTransaction(body) {
  return new Promise((resolve, reject) => {
    const accessToken = getDataFromLocalStorage('accessToken');
    fetch(`${url}products/buy`, {
      method: 'POST',
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(body)
    })
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {
      reject(error);
    })
  })
}