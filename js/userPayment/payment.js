// import { checkAuthorization } from '../api/checkAuthorization'
import { getUserAccounts } from '../userAccount/accountApi.js'
import { SORT_TYPES, getLocalStorageData } from '../localStorage/getLocalStorageData.js';
import { requestTransaction } from './paymentApi.js';
import { getOrderList } from '../userOrderList/orderListApi.js'

/* GLOBAL LOGIC */
// setMockData();
// ;(async function () {
//   const isValidUser = await checkAuthorization();
//   if(isValidUser) {
//     initPage();
//   } else {
//     Swal.fire({
//       icon: 'error',
//       title: '사용자 세션이 만료되었습니다.',
//       text: '로그인 페이지로 이동합니다.',
//     })
//     // 로그인 페이지로 redirect
//     // location.assign('로그인 페이지 경로')
//   }
// })()
export function setPaymentPage(router) {
  /* GLOBAL VARIABLES */
  const { USER_INFO, USER_ADDRESS, COUPONS, CART_LIST, USER_DATA } = SORT_TYPES;
  const payInfo = {
    orderAmount : 0,
    originAmount : 0,
    saledAmount : 0,
    totalAmount : 0,
  }
  let username; 
  const paymentList = JSON.parse(localStorage.getItem('paymentList'));

  /* DOM */
  const toggleOrderListEl = document.querySelector('#toggleOrderList');
  const toggleCouponListEl = document.querySelector('#toggleCouponList');
  const deliveryInfoTabEl = document.querySelector('.delivery-info-tab');
  const transactionButton = document.querySelector('.pay-button-area > button');

  /* EVENT LISTENER */
  toggleOrderListEl.addEventListener('click', toggleOrderList());
  toggleCouponListEl.addEventListener('click', toggleCouponList);
  deliveryInfoTabEl.addEventListener('click', toggleMessage);
  transactionButton.addEventListener('click', async () => {
    // 스피너 로딩
    const spinnerWrapperEl = document.querySelector('.spinner-wrapper');
    Object.assign(spinnerWrapperEl.style, {
      display : 'flex'
    })

    // accountId Get !
    const accountEl = document.querySelector('.swiper-slide-active');
    const accountId = accountEl.children['accountId'].dataset.accountId;

    // 계좌 잔액보다 결제금액이 클 때
    try {
      const accountList = await getUserAccounts();
      const targetAccount = accountList.find(account => account.id === accountId);
      if(targetAccount.balance < payInfo.totalAmount) {
        Swal.fire({
          icon: 'error',
          title: '잔액이 부족합니다.',
          text: err.message,
        })
        return
      }
    }
    catch (err) {
      Swal.fire({
        icon: 'error',
        title: '계좌 정보를 불러오는데 실패했습니다.',
        text: err.message,
      })
    }

    // productId, Quantity Get !
    const requests = paymentList.reduce((acc, product) => {
      const { id : productId , quantity } = product
      for(let i = 0; i < quantity; i++) {
        acc.push(requestTransaction({ productId, accountId }))
      }
      return acc;
    }, [])
    // Promise.all(requests)
    // .then((result) => {
    //   // 결제 처리 성공
    //   // localStorage cart목록
    //   // productId 배열을 state로 넘기면서 History.pushState()로 결제완료 페이지로 이동
    // })
    // .catch((err) => {
    //   // 결제 처리 실패
    //   console.error(err)
    // })
  })

  initPage();

  /* FUNCTIONS */

  async function initPage() {
    /* 주문 상품 Summary 렌더링 */
    const summaryTextEl = document.querySelector('.order-list-area > .summary span');
    summaryTextEl.textContent = `${paymentList[0].title} 포함 ${paymentList.length}개`

    /* 주문자 정보 */
    renderOrdererInfo()

    /* 배송지 정보 */
    renderUserAddress()

    /* 쿠폰 조회 및 렌더링 */
    renderCouponList()
    
    /* 사용자 계좌 */
    renderUserAccount()

    /* 결제 금액 */
    renderAmountArea()
  }

  function toggleOrderList() {
    let isActive = false;
    // closure
    return function (event) {
      const buttonEl = event.currentTarget;

      const ulEl = document.querySelector('.order-list-area > ul');
      const summaryEl = document.querySelector('.order-list-area > .summary');

      // localStorage 아이템 Get !
      const paymentList = JSON.parse(localStorage.getItem('paymentList'));

      // close -> open
      if(!isActive) {
        buttonEl.alt = "닫기";
        buttonEl.style.transform = 'rotateX(0)';
        summaryEl.style.display = 'none';
        
        // DOM Create & Render !
        const templateEl = document.createElement('template');
        paymentList.forEach(product => {
          const { title, price, quantity, thumbnail , discountRate } = product;
          // 할인율이 있는 상품은 원가를 계산한 값을 originPrice 변수에 담아 화면에 같이 렌더링
          const originPrice = discountRate ? Math.floor((price * 100) / (100 - discountRate)) : price;
          templateEl.innerHTML += /* html */`
            <li class="item">
              <img class="thumbnail" src=${thumbnail}></img>
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

        buttonEl.alt = "펼치기";
        buttonEl.style.transform = 'rotateX(180deg)';
        summaryEl.style.display = 'block';

        let summaryTextEl = summaryEl.firstElementChild;
        summaryTextEl.innerText = `${paymentList[0].title} 포함 ${paymentList.length}개`
      }

      // toggle state of flag variable
      isActive = !isActive;
    }
  }
  function toggleCouponList() {
    const couponListEl = document.querySelector('.coupon-list');
    couponListEl.classList.toggle('opened');
  }
  function toggleMessage(event) {
    const deliveryNoticeEl = this.querySelector('.delivery-notice');
    const closeMessageButton = this.querySelector('.close-message-button');
    const deliveryNoticeMessageEl = this.querySelector('.delivery-notice-message');
    if(event.target === deliveryNoticeEl) {
      showMessage()
    }
    if(event.target === closeMessageButton) {
      closeMessage()
    }
    function closeMessage() {
      Object.assign(deliveryNoticeMessageEl.style, {
        visibility : 'hidden',
        opacity : 0
      })
    }
    function showMessage() {
      Object.assign(deliveryNoticeMessageEl.style, {
        visibility : 'visible',
        opacity : 1
      })
    }
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
    const accountListEl = document.querySelector('.swiper.account-list');
    accountListEl.classList.add('d-none');

    const noListEl = document.querySelector('.no-list');
    noListEl.classList.remove('d-none');
  }
  function renderAccountList(accountList) {
    const noListEl = document.querySelector('.no-list');
    noListEl.classList.add('d-none');

    const accountListEl = document.querySelector('.swiper.account-list');
    accountListEl.classList.remove('d-none');

    const templateEl = createAccountList(accountList);

    const swiperWrapperEl = document.querySelector('.swiper-wrapper');
    swiperWrapperEl.append(templateEl.content);
  }
  function renderAmountArea() {
    const areaAmountEl = document.querySelector('.area-amount > ul');

    const orderAmountEl = areaAmountEl.querySelector('#orderAmount');
    payInfo.orderAmount = paymentList.reduce((acc, product) => {
      const { price, quantity } = product
      acc += price * quantity;
      return acc;
    }, 0)
    orderAmountEl.textContent = payInfo.orderAmount.toLocaleString('ko-KR');

    const originAmountEl = areaAmountEl.querySelector('#originAmount');
    payInfo.originAmount = paymentList.reduce((acc, product) => {
      const { price, quantity, discountRate } = product
      // 할인율이 있으면 원가를 계산하여 누적(DB에 저장된 상품 가격은 할인율이 적용된 가격)
      acc += (discountRate ? Math.floor((price * 100) / (100 - discountRate)) : price) * quantity;
      return acc;
    }, 0)
    originAmountEl.textContent = payInfo.originAmount.toLocaleString('ko-KR');

    const saledAmountEl = areaAmountEl.querySelector('#saledAmount');
    payInfo.saledAmount = payInfo.originAmount - payInfo.orderAmount;
    saledAmountEl.textContent = '-' + payInfo.saledAmount.toLocaleString('ko-KR');

    const totalAmountEl = areaAmountEl.querySelector('#totalAmount');
    payInfo.totalAmount = payInfo.orderAmount;
    totalAmountEl.textContent = payInfo.totalAmount.toLocaleString('ko-KR');
    
    const totalAmountInButtonEl = document.querySelector('#totalAmountInButton');
    totalAmountInButtonEl.textContent = payInfo.totalAmount.toLocaleString('ko-KR');
  }
  async function renderUserAccount() {
    try {
      const accountList = await getUserAccounts();
      accountList.length === 0 ? renderEmptyList() : renderAccountList(accountList);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: '계좌 정보를 불러오는데 실패했습니다.',
        text: err.message,
      })
    }
  }
  function renderCouponList() {
    const coupons = getLocalStorageData(COUPONS);

    const couponSelectorTextEl = document.querySelector('.coupon-selector > span');
    couponSelectorTextEl.textContent = `사용가능 쿠폰 0장 / 전체 ${coupons?.length || 0}장`

    const couponListEl = document.querySelector('.coupon-list');
    const templateEl = document.createElement('template');
    if(coupons) {
      coupons.forEach((coupon) => {
        templateEl.innerHTML += /* html */`
          <li class="coupon">
            <span>${coupon.name} [${coupon.discount} 할인]</span>
          </li>
        `
      })
      couponListEl.append(templateEl.content);
    }
  }
  function renderUserAddress() {
    const userAddress = getLocalStorageData(USER_ADDRESS);
    const destinationEl = document.querySelector('.destination');
    if(userAddress) {
      const { roadAddress, detailAddress } = userAddress;
      destinationEl.textContent = `${roadAddress}, ${detailAddress}`
    } else {
      destinationEl.textContent = '등록된 배송지 정보가 없습니다.'
    }
  }
  function renderOrdererInfo() {
    const userInfo = getLocalStorageData(USER_INFO)

    const senderEl = document.querySelector('.orderer-area .sender');
    senderEl.textContent = userInfo.displayName;
    username = userInfo.displayName;

    const emailEl = document.querySelector('.orderer-area .email');
    emailEl.textContent = userInfo.email;
  }
}

function setMockData () {
  // 제품명, 가격, 수량, 썸네일이미지
  const paymentList = [
    { id : '7YQPOYVq4kgrNbQV04vS', title : "고구마깡(83g*1)", price : 15400, quantity : 1, thumbnailImage : "/images/product/이토엔쟈스민티.png" },
    { id : '9X6iWhN2C5KbJpS4uhDh', title : "둥지냉면비빔냉면(162g*32)", price : 51040, quantity : 1, thumbnailImage : "/images/product/파워오투복숭아자몽.png" },
    { id : '4dVCUFjymfEqskEuMAKy', title : "츄파춥스 사워게코(90g*124)", price : 57420, quantity : 1, thumbnailImage : "/images/product/오이오차녹차.png" },
    { id : '4vs61x7YOCYBHfZuIPPU', title : "양파링(80g*1)", price : 15400, quantity : 1, thumbnailImage : "/images/product/오이오차녹차.png" },
  ]
  const loginId = JSON.parse(localStorage.getItem('loginInfo')).loginId;
  const userData = JSON.parse(localStorage.getItem(loginId))
  localStorage.setItem(loginId, JSON.stringify({...userData, paymentList}))
}
