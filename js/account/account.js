import { logInFn } from '../api/requestLogin.js'
import { checkAuthorization } from '../api/checkAuthorization.js'
import { getBankList, connectBankAccount, getUserAccounts } from './accountApi.js';
import { getAccessTokenFromLocalStorage } from './utils/localStorage.js';
import { $ } from './utils/dom.js'

/* DOM */
const modalTrigger = $('.add-account-btn');

/**
 * 계좌 추가를 위한 모달창 작업
 */
modalTrigger.addEventListener('click', async () => {
  // accessToken Get !
  const accessToken = getAccessTokenFromLocalStorage();

  // 계좌 목록 조회 API !
  let bankList = await getBankList(accessToken);

  // DOM Create !
  bankList = bankList.filter(bank => {
    return bank.name !== "케이뱅크" // 케이뱅크는 목록에서 제외합니다.
  });

  const templateEl = document.createElement('template');
  bankList.forEach(bank => {
    const { name, code, digits } = bank;
    const digitsFormat = String(digits).replaceAll(',', '-') // 계좌 번호 간 구분 기호로 좀 더 친숙한 하이픈으로 교체합니다.
    templateEl.innerHTML += /* html */`
      <li class="item">
        <input type="radio" name="bank" id=${code} required>
        <label for=${code}>${name} [${digitsFormat}]</label>
      </li>
    `
  })
  // Render !
  const ulEl = $('.bank-list');
  ulEl.innerHTML = '';
  ulEl.append(templateEl.content)

  // 이벤트 핸들러 : 계좌 자리수 추출을 위한 select change
  let totalDigits;
  ulEl.addEventListener('change', getTotalAccountDigits)

  function getTotalAccountDigits(event) {
    if(event.target.matches('input[type="radio"]')) {
      const str = event.target.labels[0].innerText;
      const matches = str.match(/\d+/g) || [];
      totalDigits = matches.reduce((acc,cur) => {
        return acc + Number(cur);
      }, 0)
    }
  }

  // 이벤트 핸들러 : 폼 submit
  const accountFormEl = $('#accountForm');
  accountFormEl.addEventListener('submit', submitAccountForm)

  function submitAccountForm(event) {
    event.preventDefault();

    // 선택한 은행 코드 추출
    const selectedBank = Array.from(event.target).find(input => input.checked);
    const bankCode = selectedBank.id;

    // 계좌 번호, 전화 번호 추출
    const accountNumber = event.target["accountNumber"].value;
    const phoneNumber = event.target["phoneNumber"].value;

    // 계좌 번호 자리수 유효성 검사
    if(totalDigits !== accountNumber.length) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '계좌 번호 자리수를 확인하세요.',
      })
      return;
    }

    const submitData = { bankCode, accountNumber, phoneNumber, signature : true }
    // 계좌 연결 API
    try {
      connectBankAccount(accessToken, submitData)
    } catch(err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '계좌 등록에 실패했습니다.',
      })
      console.error(err);
    }

    const modalEl = $('input[type="checkbox"]#modal');
    modalEl.checked = false; // 모달창 닫기

    // form 제출 완료되면 내부에서 사용한 이벤트 핸들러 제거
    ulEl.removeEventListener('change', getTotalAccountDigits)
    accountFormEl.removeEventListener('submit', submitAccountForm)
  }
})



/* GLOBAL LOGIC */

// 토큰 만료 시 실행 (로그인 기능 fetch 시 삭제 예정)
// logInFn({
//   email : "testuser@gmail.com",
//   password : "12345678"
// })
;(async function () {
  const isValidUser = await checkAuthorization();
  console.log(isValidUser)
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

  // initPage();


async function initPage() {
  // 사용자 계좌 목록 조회
  const accessToken = getAccessTokenFromLocalStorage();
  const res = await getUserAccounts(accessToken);
  const accountList = res.accounts || [];
  console.log(accountList)

  // 있을 때 없을 때 구분하여 렌더링
  // 있을 때
  if(accountList.length === 0) {
    // 없을 때
  } else {
    const noListEl = $('.no-list');
    noListEl.classList.add('d-none');

    // DOM Create !
    const templateEl = document.createElement('template');
    accountList.forEach(account => {
      const { bankName, accountNumber, balance } = account;
      const formattedBalance = balance.toLocaleString('ko-KR')
      templateEl.innerHTML += /* html */`
        <li class="item">
          <div class="account-info">
            <span id="account-bank">${bankName}</span>
            <span id="account-number">${accountNumber}</span>
            <span id="account-balance">${formattedBalance}</span>
          </div>
          <button class="account-delete-btn">삭제</button>
        </li>
      `
    })
    // Render !
    const ulEl = $('.account-list');
    ulEl.innerHTML = '';
    ulEl.append(templateEl.content);
  }
}

// 계좌 해지(삭제) 기능 추가