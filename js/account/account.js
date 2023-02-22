import { logInFn } from '../api/requestLogin.js';
import { checkAuthorization } from '../api/checkAuthorization.js';
import { getBankList, connectBankAccount, getUserAccounts, deleteAccount } from './accountApi.js';
import { makeDOMwithProperties } from '../utils/dom.js';

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

const modalTrigger = document.querySelector('.add-account-btn');
modalTrigger.addEventListener('click', async () => {
  const modalSpinnerEl = document.querySelector('.modal-spinner');
  Object.assign(modalSpinnerEl.style, {
    display : 'flex' // 스피너 노출
  })

  // 계좌 목록 조회 API !
  let bankList = await getBankList();

  // DOM 생성 !
  const templateEl = createBankList(bankList);

  // Render !
  renderBankList(templateEl);
  Object.assign(modalSpinnerEl.style, {
    display : 'none' // 스피너 숨김
  })

  // 계좌 자리수 총합을 구하기 위한 리스너. 계좌 번호 유효성 검사에 사용
  let totalDigits;
  const ulEl = document.querySelector('.bank-list');
  ulEl.addEventListener('change', getTotalAccountDigits)

  // 폼 제출 리스너
  const accountFormEl = document.querySelector('#accountForm');
  accountFormEl.addEventListener('submit', submitAccountForm)

  // MODAL FUNCTIONS
  function createBankList(bankList) {
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
    return templateEl;
  }
  function renderBankList(templateEl) {
    const ulEl = document.querySelector('.bank-list');
    ulEl.innerHTML = '';
    ulEl.append(templateEl.content)
  }
  function getTotalAccountDigits(event) {
    if(event.target.matches('input[type="radio"]')) {
      const str = event.target.labels[0].innerText;
      const matches = str.match(/\d+/g) || [];
      totalDigits = matches.reduce((acc,cur) => {
        return acc + Number(cur);
      }, 0)
    }
  }
  async function submitAccountForm(event) {
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
      const res = await connectBankAccount(submitData);
      if(typeof res !== 'string') {
        // 연결 요청 성공 시
        Swal.fire(
          '연결 성공!',
          '계좌가 성공적으로 연결되었습니다.',
          'success'
        )

        //리렌더링
        initPage();

        // 모달창 닫기
        const modalEl = document.querySelector('input[type="checkbox"]#modal');
        modalEl.checked = false;
  
        // 내부에서 사용한 이벤트 핸들러 제거
        ulEl.removeEventListener('change', getTotalAccountDigits)
        accountFormEl.removeEventListener('submit', submitAccountForm)
      } else {
        // 연결 요청 실패 시
        throw new Error('계좌 연결에 실패했습니다.') // 에러 처리 고도화 필요
      }
    } catch(err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      })
      console.error(err);
    }
  }
})

// FUNCTIONS
async function initPage() {
  // 사용자 계좌 목록 조회
  const accountList = await getUserAccounts();

  accountList.length === 0 ? renderEmptyList() : renderAccountList(accountList);

  const skeletonLoadingEl = document.querySelector('.skeleton-loading');
  skeletonLoadingEl.classList.add('d-none');
}

function createAccountList (accountList) {
  const fragmentEl = document.createDocumentFragment();
  accountList.forEach(account => {
    const { id, bankName, accountNumber, balance } = account;
    const formattedBalance = balance.toLocaleString('ko-KR'); // 통화 표기법으로 변경

    const liEl = makeDOMwithProperties('li', { 'className' : 'item' });
    const accountInfoEl = makeDOMwithProperties('div', { 'className' : 'account-info'});
    const accountBankEl = makeDOMwithProperties('span', { 'id' : 'accountBank', 'innerText': bankName});
    const accountNumberEl = makeDOMwithProperties('span', { 'id' : 'accountNumber', 'innerText': accountNumber});
    const accountBalanceEl = makeDOMwithProperties('span', { 'id' : 'accountBalance', 'innerText': formattedBalance });

    const btnEl = makeDOMwithProperties('button', { 'className' : 'account-delete-btn', 'innerText' : '삭제'});
    btnEl.dataset.accountId = id; // 버튼에 해당 계좌 id를 dataset로 저장
    btnEl.addEventListener('click', (event) => {
      Swal.fire({
        title: '정말로 삭제하겠습니까 ?',
        text: "삭제한 계좌는 재연결해도 잔액이 반영되지 않습니다.(기본 금액으로 추가됩니다)",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '삭제',
        cancelButtonText: '취소'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const body = { accountId : event.target.dataset.accountId, signature : true };
          console.log(body)

          try {
            // 삭제 요청 API 전송
            const res = await deleteAccount(body);
            if(res) {
              // 삭제 요청 성공 시
              Swal.fire(
                '삭제 성공!',
                '계좌가 성공적으로 삭제되었습니다.',
                'success'
              )
              // 리렌더링
              const accountList = await getUserAccounts()
              if(accountList.length === 0) {
                renderEmptyList()
              } else {
                renderAccountList(accountList);
              }
            } else {
              throw new Error('계좌 삭제에 실패했습니다.')
            }
          } catch(err) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.message,
            })
            console.error(err);
            return;
          }
        }
      })
    });

    accountInfoEl.append(accountBankEl, accountNumberEl, accountBalanceEl);
    liEl.append(accountInfoEl, btnEl);
    fragmentEl.append(liEl);
  })
  return fragmentEl;

  // 렌더링 구조 참고
  /* html */`
    <li class="item">
      <div class="account-info">
        <span id="accountBank">NH농협은행</span>
        <span id="accountNumber">123-XXXX-XXXX-XX</span>
        <span id="accountBalance">3,000,000</span>
      </div>
      <button class="account-delete-btn">삭제</button>
    </li>
  `
}
function renderAccountList (accountList) {
  const fragmentEl = createAccountList(accountList);

  const ulEl = document.querySelector('.account-list');
  ulEl.innerHTML = '';
  ulEl.append(fragmentEl);
}
function renderEmptyList () {
  const ulEl = document.querySelector('.account-list');
  ulEl.innerHTML = '';
  ulEl.innerHTML = /* html */`
    <div class="no-list-wrapper">
    <p class="no-list">등록된 계좌가 없습니다.</p>
    </div>
  `
}