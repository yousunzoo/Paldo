import { checkAuthorization } from '../api/checkAuthorization'
import { getUserAccounts } from '../account/accountApi.js'

/* COMMON */
const $ = selector => document.querySelector(selector);

/* DOM */
const toggleOrderListEl = $('#toggleOrderList');
const toggleCouponListEl = $('#toggleCouponList');


/* EVENT LISTENER */
toggleOrderListEl.addEventListener('click', toggleOrderList());
toggleCouponListEl.addEventListener('click', toggleCouponList);

/* GLOBAL LOGIC */
// setMockData();
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
  /* 주문 상품 섹션 Summary 출력 */
  const summaryTextEl = $('.order-list-area > .summary span');

  /**
   * @todo localStorage key,value format 변경에 따른 수정 예정
   */
  const json = localStorage.getItem('cartProduct');
  const cartProduct = JSON.parse(json);

  summaryTextEl.innerText = `${cartProduct[0].title} 외 ${cartProduct.length -1}개`

  /* 계좌 조회 */
  const accountList = await getUserAccounts();
  if(accountList.length === 0) {
    renderEmptyList()
  } else {
    renderAccountList(accountList);
  }

  /* 결제 관련 */
}

/**
 * localStorage Mock Data Setting
 */
function setMockData () {
  // 제품명, 가격, 수량, 썸네일이미지
  const cartProduct = [
    { productId : 1, title : "감자깡", price : 7000, quantity : 1, thumbnailImage : "/images/product/감자깡.png" },
    { productId : 2, title : "감자면", price : 6000, quantity : 1, thumbnailImage : "/images/product/감자면.png" },
    { productId : 3, title : "고구마깡", price : 5000, quantity : 1, thumbnailImage : "/images/product/고구마깡.png" },
    { productId : 4, title : "둥지냉면 동치미 물냉면", price : 4000, quantity : 1, thumbnailImage : "/images/product/둥지냉면동치미물냉면.png" },
  ]
  localStorage.setItem('cartProduct', JSON.stringify(cartProduct))
}

function toggleOrderList() {
  let isActive = false;
  // closure
  return function (event) {
    const btnEl = event.currentTarget;

    const ulEl = $('.order-list-area > ul');
    const summaryEl = $('.order-list-area > .summary');

    // localStorage 아이템 Get !
    const json = localStorage.getItem('cartProduct');
    let cartProduct = JSON.parse(json);

    // close -> open
    if(!isActive) {
      btnEl.alt = "닫기";
      btnEl.style.transform = 'rotateX(180deg)';
      summaryEl.style.display = 'none';
      
      // DOM Create & Render !
      const templateEl = document.createElement('template');
      cartProduct.forEach(product => {
        const { title, price, quantity, thumbnailImage } = product;
        templateEl.innerHTML += /* html */`
          <li class="item">
            <img class="thumbnail" src=${thumbnailImage}></img>
            <span class="title-wrapper">
              <span class="title">${title}</span>
            </span>
            <div class="quantity-wrapper">
              <span class="quantity">${quantity}</span>
              <span>개</span>
            </div>
            <span class="price-wrapper">
              <span class="price">${price}</span>
              <span>원</span>
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
      summaryTextEl.innerText = `${cartProduct[0].title} 외 ${cartProduct.length -1}개`
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
    const formattedBalance = balance.toLocaleString('ko-KR'); // 통화 표기법으로 변경

    templateEl.innerHTML += /* html */`
      <div class="swiper-slide">
        <div class="account-info" id="accountId" data-account-id=${id}>
          <h4 id="bankName">${bankName}</h4>
          <p id="accountNumber">${accountNumber}</p>
          <span id="balance">${formattedBalance}</span>
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

//swiper-slide-active 클래스의 자식 