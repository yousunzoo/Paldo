import { checkAuthorization } from '../api/checkAuthorization'
import { getUserAccounts } from '../account/accountApi.js'
import { getDataFromLocalStorage } from './utils/localStorage.js';
import { requestTransaction } from './orderSheetApi.js';
import { getOrderList } from '../order-list/orderListApi.js'

/* COMMON */
const $ = selector => document.querySelector(selector);

/* DOM */
const toggleOrderListEl = $('#toggleOrderList');
const toggleCouponListEl = $('#toggleCouponList');
const transactionBtn = $('.pay-btn-area > button');

/* EVENT LISTENER */
toggleOrderListEl.addEventListener('click', toggleOrderList());
toggleCouponListEl.addEventListener('click', toggleCouponList);
transactionBtn.addEventListener('click',async () => {
  // accountId Get !
  const accountEl = $('.swiper-slide-active');
  const accountId = accountEl.children['accountId'].dataset.accountId;
  console.log(accountId)

  // productId, Quantity Get !
  const cartList = getDataFromLocalStorage('cart');
  const requests = cartList.reduce((acc, cur) => {
    const { productId, quantity } = cur
    for(let i = 0; i < quantity; i++) {
      acc.push(requestTransaction({ productId, accountId }))
    }
    return acc;
  }, [])
  console.log(requests)
  console.log(await getOrderList())
  
  // Promise.all(requests)
  // .then((result) => {
  //   // 결제 처리 성공
  //   // 결제완료 페이지로 이동
  // })
  // .catch((err) => {
  //   // 결제 처리 실패
  //   console.error(err)
  // })
})

/* GLOBAL LOGIC */
setMockData();
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

/**
 * initialize page
 */
async function initPage() {
  /* 주문 상품 섹션 Summary 렌더링 */
  const cartList = getDataFromLocalStorage('cart');

  const summaryTextEl = $('.order-list-area > .summary span');
  summaryTextEl.innerText = `${cartList[0].title} 외 ${cartList.length -1}개`

  /* 주문자 정보 렌더링 */
  const userInfo = getDataFromLocalStorage('userInfo')

  const senderEl = document.querySelector('.orderer-area .sender');
  senderEl.textContent = userInfo.displayName;

  const emailEl = document.querySelector('.orderer-area .email');
  emailEl.textContent = userInfo.email;

  /* 사용자 계좌 조회 및 렌더링 */
  const accountList = await getUserAccounts();
  accountList.length === 0 ? renderEmptyList() : renderAccountList(accountList);

  /* 결제 금액 */
  const orderAmountEl = $('#orderAmount');
  let orderAmount = cartList.reduce((acc, cur) => {
    const { price, quantity } = cur
    acc += price * quantity;
    return acc;
  }, 0)
  orderAmountEl.textContent = orderAmount.toLocaleString('ko-KR');

  const originAmountEl = $('#originAmount');
  const originAmount = cartList.reduce((acc, cur) => {
    const { price, quantity, discountRate } = cur
    // 할인율이 있으면 원가를 계산하여 누적(DB에 저장된 상품 가격은 할인율이 적용된 가격)
    acc += (discountRate ? Math.floor((price * 100) / (100 - discountRate)) : price) * quantity;
    return acc;
  }, 0)
  originAmountEl.textContent = originAmount.toLocaleString('ko-KR');

  const saledAmountEl = $('#saledAmount');
  const saledAmount = originAmount - orderAmount;
  saledAmountEl.textContent = '-' + saledAmount.toLocaleString('ko-KR');

  const totalAmountEl = $('#totalAmount');
  let totalAmount = orderAmount;
  totalAmountEl.textContent = totalAmount.toLocaleString('ko-KR');
  
  const totalAmountInBtnEl = $('#totalAmountInBtn');
  totalAmountInBtnEl.textContent = totalAmount.toLocaleString('ko-KR');
}

/**
 * localStorage Mock Data Setting
 */
function setMockData () {
  // 제품명, 가격, 수량, 썸네일이미지
  const cart = [
    { productId : 'xr14ikmurlABzuizuDge', title : "이토엔쟈스민티(500ml*24)", price : 37950, quantity : 2, thumbnailImage : "/images/product/이토엔쟈스민티.png" },
    { productId : 'sm9RXKb3hpHe3MfEZyjb', title : "카프리썬 오렌지(200ml*10)", price : 6050, discountRate : 15, quantity : 3, thumbnailImage : "/images/product/카프리썬오렌지.png" },
    { productId : 'sWpLAtpN52bmwkhqiq1S', title : "파워오투 복숭아자몽(500ml*24)", price : 35200, quantity : 1, thumbnailImage : "/images/product/파워오투복숭아자몽.png" },
    { productId : 'sCTHoWGOEdROxEuiMb4v', title : "오이오차녹차(525ml*24)", price : 38060, quantity : 4, thumbnailImage : "/images/product/오이오차녹차.png" },
  ]
  const loginId = JSON.parse(localStorage.getItem('loginInfo')).loginId;
  const userData = JSON.parse(localStorage.getItem(loginId))
  localStorage.setItem(loginId, JSON.stringify({...userData, cart}))
}
function toggleOrderList() {
  let isActive = false;
  // closure
  return function (event) {
    const btnEl = event.currentTarget;

    const ulEl = $('.order-list-area > ul');
    const summaryEl = $('.order-list-area > .summary');

    // localStorage 아이템 Get !
    const cartList = getDataFromLocalStorage('cart');

    // close -> open
    if(!isActive) {
      btnEl.alt = "닫기";
      btnEl.style.transform = 'rotateX(180deg)';
      summaryEl.style.display = 'none';
      
      // DOM Create & Render !
      const templateEl = document.createElement('template');
      cartList.forEach(product => {
        const { title, price, quantity, thumbnailImage , discountRate } = product;
        // 할인율이 있는 상품은 원가를 계산한 값을 originPrice 변수에 담아 화면에 같이 렌더링
        const originPrice = discountRate ? Math.floor((price * 100) / (100 - discountRate)) : price;
        templateEl.innerHTML += /* html */`
          <li class="item">
            <img class="thumbnail" src=${thumbnailImage}></img>
            <span class="title-wrapper">
              <span class="title">${title}</span>
            </span>
            <div class="quantity-wrapper">
              <span class="quantity">${quantity}개</span>
            </div>
            <span class="price-wrapper">
              <span class="discount-price">${(price * quantity).toLocaleString('ko-KR')}원</span>
              <span class="cost-price">${ originPrice === price ? '' : (originPrice * quantity).toLocaleString('ko-KR') + '원' }</span>
            </span>
          </li>
        `
      })
      ulEl.append(templateEl.content);
    }

    // open -> close
    if(isActive) {
      ulEl.innerHTML = '';

      btnEl.alt = "펼치기";
      btnEl.style.transform = 'rotateX(0)';
      summaryEl.style.display = 'block';

      let summaryTextEl = summaryEl.firstElementChild;
      summaryTextEl.innerText = `${cartList[0].title} 외 ${cartList.length -1}개`
    }

    // toggle state of flag variable
    isActive = !isActive;
  }
}
function toggleCouponList() {
  const couponListEl = $('.coupon-list');
  couponListEl.classList.toggle('opened');
}
function createAccountList(accountList) {
  const templateEl = document.createElement('template');
  accountList.forEach(account => {
    const { id, bankName, accountNumber, balance } = account;

    templateEl.innerHTML += /* html */`
      <div class="swiper-slide">
        <div class="account-info" id="accountId" data-account-id=${id}>
          <h4 id="bankName">${bankName}</h4>
          <p id="accountNumber">${accountNumber}</p>
          <span id="balance">${balance.toLocaleString('ko-KR')}</span>
        </div>
      </div>
    `
  })
  return templateEl;
}
function renderEmptyList() {
  const accountListEl = $('.account-list');
  accountListEl.classList.add('d-none');

  const noListEl = $('.no-list');
  noListEl.classList.remove('d-none');
}
function renderAccountList(accountList) {
  const noListEl = $('.no-list');
  noListEl.classList.add('d-none');

  const accountListEl = $('.account-list');
  accountListEl.classList.remove('d-none');

  const templateEl = createAccountList(accountList);

  const swiperWrapperEl = $('.swiper-wrapper');
  swiperWrapperEl.append(templateEl.content);
}