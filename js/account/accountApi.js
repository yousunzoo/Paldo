import { headers, url } from '../api/headers.js'
import { getAccessTokenFromLocalStorage } from './utils/localStorage.js'

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
 * @param {*} body {
    bankCode: string // 연결할 은행 코드 (필수!)
    accountNumber: string // 연결할 계좌번호 (필수!)
    phoneNumber: string // 사용자 전화번호 (필수!)
    signature: boolean // 사용자 서명 (필수!)
  }
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
 * @return accountList: Bank[] // 사용자 계좌 정보 목록
  } 
 * interface Bank { 
    id: string // 계좌 ID
    bankName: string // 은행 이름
    bankCode: string // 은행 코드
    accountNumber: string // 계좌 번호
    balance: number // 계좌 잔액
  }
 */ 
export async function getUserAccounts() {
  const accessToken = getAccessTokenFromLocalStorage();
  const res = await fetch(`${url}account`, {
    method: 'GET',
    headers : {
      ...headers,
      Authorization: `Bearer ${accessToken}`
    }
  })
  const json = await res.json();
  const accountList = json.accounts || [];
  return accountList;
}

/**
 * 계좌 해지
 * @param {*} accessToken 
 * @param {*} body  {
    accountId: string
    signature: boolean
  }
 * @return 
 */
export async function deleteAccount(accessToken, body) {
  const res = await fetch(`${url}account`, {
    method: 'DELETE',
    headers : {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body)
  })
  const json = await res.json();
  return json
}