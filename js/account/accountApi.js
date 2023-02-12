import { headers, url } from '../api/headers.js'

// 모든 API는 외부에서 accessToken을 받아 API 요청을 보냅니다.

/**
 * 계좌 목록 조회
 * @param {*} accessToken 
 * @returns 응답 json 
 */
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

/**
 * 계좌 연결
 * @param {*} accessToken 
 * @param {*} body 
 * @returns 응답 json
 */
export async function connectBankAccount (accessToken, body) {
  const res = await fetch(`${url}account`, {
    method: 'POST',
    headers : {
      ...headers,
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(body)
  })
  const json = await res.json();
  return json;
}