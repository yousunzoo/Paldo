import { getBankList, connectBankAccount } from './accountApi.js';

/* COMMON */
const $ = selector => document.querySelector(selector)

/* DOM */
const modalTrigger = $('.add-account-btn');
const accountFormEl = $('#accountForm');

/* EVENT HANDLER */

/**
 * 계좌 추가를 위한 모달창 작업
 */
modalTrigger.addEventListener('click', async () => {
  // localStroage Get !
  const json = localStorage.getItem('loginInfo');
  const loginInfo = JSON.parse(json);
  const { accessToken } = loginInfo;

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
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '계좌 등록에 실패했습니다.',
      })
    }

    const modalEl = $('input[type="checkbox"]#modal');
    modalEl.checked = false; // 모달창 닫기

    // form 제출 완료되면 내부에서 사용한 이벤트 핸들러 제거
    ulEl.removeEventListener('change', getTotalAccountDigits)
    accountFormEl.removeEventListener('submit', submitAccountForm)
  }
})



/* GLOBAL LOGIC */
// 사용자 인증 확인