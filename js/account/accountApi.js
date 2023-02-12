import { headers, url } from '../api/headers.js'

// 모든 API는 외부에서 accessToken을 받아 API 요청을 보냅니다.

/**
 * 선택 가능한 계좌 목록 조회
 * @param {*} accessToken 
 * @returns 
    type ResponseValue = Bank[]
    interface Bank { // 선택 가능한 은행 정보
      name: string // 은행 이름
      code: string // 은행 코드
      digits: number[] // 은행 계좌 자릿수
      disabled: boolean // 사용자가 추가한 계좌 여부
    } 
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
 * @returns ResponseValue { 
    id: string // 계좌 ID
    bankName: string // 은행 이름
    bankCode: string // 은행 코드
    accountNumber: string // 계좌 번호
    balance: number // 계좌 잔액
  }
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

/**
 * 사용자 계좌 목록 조희
 * @param {*} accessToken 
 * @return ResponseValue {
    totalBalance: number // 사용자 계좌 잔액 총합
    accounts: Bank[] // 사용자 계좌 정보 목록
  } 
 * interface Bank { 
    id: string // 계좌 ID
    bankName: string // 은행 이름
    bankCode: string // 은행 코드
    accountNumber: string // 계좌 번호
    balance: number // 계좌 잔액
  }
 */ 
export async function getUserAccounts(accessToken) {
  const res = await fetch(`${url}account`, {
    method: 'GET',
    headers : {
      ...headers,
      Authorization: `Bearer ${accessToken}`
    }
  })
  const json = res.json();
  return json;
}