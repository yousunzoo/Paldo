import { headers, url } from '../api/headers.js'
import { SORT_TYPES, getDataFromLocalStorage } from './utils/localStorage.js'

const { ACCESS_TOKEN } = SORT_TYPES;

/**
 * 선택 가능한 계좌 목록 조회
 * @returns ResponseValue = Bank[]
 *  interface Bank {
      name: string,
      code: string,
      digits: number[],
      disabled: boolean
    } 
 */
export async function getBankList () {
  const accessToken = getDataFromLocalStorage(ACCESS_TOKEN);
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
 * @param {*} body {
    bankCode: string,
    accountNumber: string,
    phoneNumber: string,
    signature: boolean
  }
 * @returns ResponseValue { 
    id: string,
    bankName: string,
    bankCode: string,
    accountNumber: string,
    balance: number
  }
 */
export async function connectBankAccount (body) {
  const accessToken = getDataFromLocalStorage(ACCESS_TOKEN);
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
 * @return accountList: Bank[]
 * interface Bank { 
    id: string,
    bankName: string,
    bankCode: string,
    accountNumber: string,
    balance: number
  }
 */ 
export async function getUserAccounts() {
  const accessToken = getDataFromLocalStorage(ACCESS_TOKEN);
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
 * @param {*} body  {
    accountId: string,
    signature: boolean
  }
 * @return ResponseValue = true
 */
export async function deleteAccount(body) {
  const accessToken = getDataFromLocalStorage(ACCESS_TOKEN);
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