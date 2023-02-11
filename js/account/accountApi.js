import { headers, url } from '../api/headers.js'

export async function getBankList (accessToken) {
  const res = await fetch(`${url}account/banks`, {
    headers : {
      ...headers,
      Authorization: `Bearer ${accessToken}`
    }
  })
  const json = await res.json();
  return json;
}