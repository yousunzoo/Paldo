import { getBankList } from './accountApi.js';

/* COMMON */
const $ = selector => document.querySelector(selector)

/* DOM */
const modalTrigger = $('.add-account-btn');

/* EVENT HANDLER */
modalTrigger.addEventListener('click', async () => {
  // localStroage Get !
  const json = localStorage.getItem('loginInfo');
  const loginInfo = JSON.parse(json);
  const { accessToken } = loginInfo;

  // 계좌 목록 조회 API !
  let bankList = await getBankList(accessToken);

  // DOM Create & Render !
  bankList = bankList.filter(bank => {
    return bank.name !== "케이뱅크"
  });
  console.log(bankList)

  const templateEl = document.createElement('template');
  bankList.forEach(bank => {
    const { name, code, digits } = bank;
    const digitsFormat = String(digits).replaceAll(',', '-') // 계좌 번호 간 구분 기호로 좀 더 친숙한 하이픈으로 교체합니다.
    templateEl.innerHTML += /* html */`
      <li class="item">
        <input type="radio" name="bank" id=${code}>
        <label for=${code}>${name} [${digitsFormat}]</label>
      </li>
    `
  })
  const ulEl = $('.bank-list');
  ulEl.innerHTML = '';
  ulEl.append(templateEl.content)
})


/* GLOBAL LOGIC */
// 사용자 인증 확인