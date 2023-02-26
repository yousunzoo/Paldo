import { SORT_TYPES, getLocalStorageData } from '../localStorage/getLocalStorageData.js';
import { headers, url } from "../api/headers.js";

const { ACCESS_TOKEN } = SORT_TYPES;

export default async function (body) {
  const accessToken = getLocalStorageData(ACCESS_TOKEN);
  try {
    const res = fetch(`${url}products/ok`, {
      method: 'POST',
      headers : {
        ...headers,
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(body)
    })
    if(!res.ok) {
      const errorMessage = await res.json()
      switch(res.status) {
        case 401 :
          Swal.fire({
            icon: 'error',
            title: errorMessage,
            text: '재로그인 후 다시 시도해주세요.',
          })
          break;
        default : 
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: '알 수 없는 오류가 발생했습니다.',
          })
      }
      return false
    }
    const json = await res.json();
    return json;
  } catch(error) {
    console.error(error)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: '일시적인 네트워크 오류가 발생했습니다.',
    })
    return false
  }
}