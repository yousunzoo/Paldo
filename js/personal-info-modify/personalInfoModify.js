import { checkAuthorization } from '../api/checkAuthorization.js'
import { SORT_TYPES, getDataFromLocalStorage } from './utils/localStorage.js';

/* COMMON */
const $ = selector => document.querySelector(selector);
const { USER_INFO, USER_ADDRESS } = SORT_TYPES

/* GLOBAL LOGIC */
;(async function () {
  const isValidUser = await checkAuthorization();
  if(isValidUser) {
    initPage();
  } else {
    Swal.fire({
      icon: 'error',
      title: '사용자 세션이 만료되었습니다.',
      text: '로그인 페이지로 이동합니다.',
    })
    // 로그인 페이지로 redirect
    // location.assign('로그인 페이지 경로')
  }
})()

/* FUNCTIONS */
function initPage() {
  /* 기존 정보 출력 */
  // userName
  const userName = getDataFromLocalStorage(USER_INFO).displayName;
  const userNameEl = $('#userName');
  userNameEl.value = userName;
  // userAddress
  // "userAddress":{"detailAddress":"101호","postcode":"03054","roadAddress":"서울 종로구 청와대로 73"}
  const userAddress = getDataFromLocalStorage(USER_ADDRESS);
  const { detailAddress, postcode, roadAddress } = userAddress;
  const postcodeEl = $('#postcode');
  postcodeEl.value = postcode;
  const roadAddressEl = $('#roadAddress');
  roadAddressEl.value = roadAddress;
  const detailAddressEl = $('#detailAddress');
  detailAddressEl.value = detailAddress;
}
