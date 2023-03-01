import { checkAuthorization } from "../../api/checkAuthorization";
import { SORT_TYPES, getLocalStorageData } from "../../utils/localStorage/getLocalStorageData";
import requestTransaction from "../../api/requestTransaction";
import getOrderList from "../../api/getOrderList";
import cancelTransaction from "../../api/cancelTransaction";
import { analyzeOrderList } from "../userOrderList/orderList";
import getUserAccounts from "../../api/getUserAccounts";
export async function setPaymentPage(router) {
  const isLogin = await checkAuthorization();
  if (!isLogin) return;
  /* GLOBAL VARIABLES */
  const { USER_INFORMATION, USER_ADDRESS, COUPONS, CART_LIST } = SORT_TYPES;
  const payInformation = {
    orderAmount: 0,
    originAmount: 0,
    saledAmount: 0,
    totalAmount: 0,
  };
  const paymentList = JSON.parse(localStorage.getItem("paymentList"));

  /* DOM */
  const toggleOrderListEl = document.querySelector("#toggleOrderList");
  const toggleCouponListEl = document.querySelector("#toggleCouponList");
  const deliveryInformationTabEl = document.querySelector(".delivery-information-tab");
  const transactionButton = document.querySelector(".pay-button-area > button");

  /* EVENT LISTENER */
  toggleOrderListEl.addEventListener("click", toggleOrderList());
  toggleCouponListEl.addEventListener("click", toggleCouponList);
  deliveryInformationTabEl.addEventListener("click", toggleMessage);
  transactionButton.addEventListener("click", async () => {
    // 스피너 로딩
    const spinnerWrapperEl = document.querySelector(".spinner-wrapper");
    Object.assign(spinnerWrapperEl.style, {
      display: "flex",
    });

    // accountId Get !
    const accountEl = document.querySelector(".swiper-slide-active");
    const accountId = accountEl.children["accountId"].dataset.accountId;

    // 계좌 잔액보다 결제금액이 클 때
    const res = await getUserAccounts();
    if (!res) return;
    const accountList = res.accounts;
    const targetAccount = accountList.find((account) => account.id === accountId);
    if (targetAccount.balance < payInformation.totalAmount) {
      Swal.fire({
        icon: "error",
        title: "잔액이 부족합니다.",
        text: err.message,
      });
      return;
    }

    // 거래 요청 api 전송
    let requests = [];
    for (const payment of paymentList) {
      const { id: productId, quantity } = payment;
      for (let i = 0; i < quantity; i++) {
        const transactionResult = await requestTransaction({ productId, accountId });
        requests.push(transactionResult);
      }
    }

    Promise.allSettled(requests)
      .then(async (results) => {
        const isFailed = results.some((result) => result.status === "rejected");
        if (isFailed) {
          // 실패한 요청이 있을 경우
          const orderListData = await getOrderList();
          const analyzedData = analyzeOrderList(orderListData);
          // 가장 최근의 거래 건에 대한 주문 취소 진행
          analyzedData[0].detailId.forEach((transactionId) => {
            cancelTransaction({ detailId: transactionId });
          });
        } else {
          // 모든 요청이 성공
          // localStorage cartList에서 결제 진행된 상품 제거
          const cartList = getLocalStorageData(CART_LIST);
          const newCartList = cartList.filter(
            (cart) => !paymentList.some((payment) => cart.id === payment.id)
          );

          const loginId = JSON.parse(localStorage.getItem("loginInfo")).loginId;
          const userData = JSON.parse(localStorage.getItem(loginId));
          localStorage.setItem(loginId, JSON.stringify({ ...userData, cartList: newCartList }));

          // 결제 완료 페이지로 이동
          router.navigate("/paymentComplete");
        }
      })
      .catch((error) => {});
  });

  initPage();

  /* FUNCTIONS */

  async function initPage() {
    /* 주문 상품 Summary 렌더링 */
    const summaryTextEl = document.querySelector(".order-list-area > .summary span");
    summaryTextEl.textContent = `${paymentList[0].title} 포함 ${paymentList.length}개`;

    /* 주문자 정보 */
    renderOrdererInformation();

    /* 배송지 정보 */
    renderUserAddress();

    /* 쿠폰 조회 및 렌더링 */
    renderCouponList();

    /* 사용자 계좌 */
    renderUserAccount();

    /* 결제 금액 */
    renderAmountArea();
  }

  function toggleOrderList() {
    let isActive = false;
    // closure
    return function (event) {
      const buttonEl = event.currentTarget;

      const ulEl = document.querySelector(".order-list-area > ul");
      const summaryEl = document.querySelector(".order-list-area > .summary");

      // localStorage 아이템 Get !
      const paymentList = JSON.parse(localStorage.getItem("paymentList"));

      // close -> open
      if (!isActive) {
        buttonEl.alt = "닫기";
        buttonEl.style.transform = "rotateX(0)";
        summaryEl.style.display = "none";

        // DOM Create & Render !
        const templateEl = document.createElement("template");
        paymentList.forEach((product) => {
          const { title, price, quantity, thumbnail, discountRate } = product;
          // 할인율이 있는 상품은 원가를 계산한 값을 originPrice 변수에 담아 화면에 같이 렌더링
          const originPrice = discountRate
            ? Math.floor((price * 100) / (100 - discountRate))
            : price;
          templateEl.innerHTML += /* html */ `
            <li class="item">
              <img class="thumbnail" src=${thumbnail}></img>
              <span class="title-wrapper">
                <span class="title">${title}</span>
              </span>
              <div class="quantity-wrapper">
                <span class="quantity">${quantity}개</span>
              </div>
              <span class="price-wrapper">
                <span class="discount-price">${(price * quantity).toLocaleString("ko-KR")}원</span>
                <span class="cost-price">${
                  originPrice === price
                    ? ""
                    : (originPrice * quantity).toLocaleString("ko-KR") + "원"
                }</span>
              </span>
            </li>
          `;
        });
        ulEl.append(templateEl.content);
      }

      // open -> close
      if (isActive) {
        ulEl.innerHTML = "";

        buttonEl.alt = "펼치기";
        buttonEl.style.transform = "rotateX(180deg)";
        summaryEl.style.display = "block";

        let summaryTextEl = summaryEl.firstElementChild;
        summaryTextEl.innerText = `${paymentList[0].title} 포함 ${paymentList.length}개`;
      }

      // toggle state of flag variable
      isActive = !isActive;
    };
  }
  function toggleCouponList() {
    const couponListEl = document.querySelector(".coupon-list");
    couponListEl.classList.toggle("opened");
  }
  function toggleMessage(event) {
    const deliveryNoticeEl = this.querySelector(".delivery-notice");
    const closeMessageButton = this.querySelector(".close-message-button");
    const deliveryNoticeMessageEl = this.querySelector(".delivery-notice-message");
    if (event.target === deliveryNoticeEl) {
      showMessage();
    }
    if (event.target === closeMessageButton) {
      closeMessage();
    }
    function closeMessage() {
      Object.assign(deliveryNoticeMessageEl.style, {
        visibility: "hidden",
        opacity: 0,
      });
    }
    function showMessage() {
      Object.assign(deliveryNoticeMessageEl.style, {
        visibility: "visible",
        opacity: 1,
      });
    }
  }
  function createAccountList(accountList) {
    const templateEl = document.createElement("template");
    accountList.forEach((account) => {
      const { id, bankName, accountNumber, balance } = account;

      templateEl.innerHTML += /* html */ `
        <div class="swiper-slide">
          <div class="account-information" id="accountId" data-account-id=${id}>
            <h4 id="bankName">${bankName}</h4>
            <p id="accountNumber">${accountNumber}</p>
            <span id="balance">${balance.toLocaleString("ko-KR")}</span>
          </div>
        </div>
      `;
    });
    return templateEl;
  }
  function renderEmptyList() {
    const accountListEl = document.querySelector(".swiper.account-list");
    accountListEl.classList.add("d-none");

    const noListEl = document.querySelector(".no-list");
    noListEl.classList.remove("d-none");
  }
  function renderAccountList(accountList) {
    const noListEl = document.querySelector(".no-list");
    noListEl.classList.add("d-none");

    const accountListEl = document.querySelector(".swiper.account-list");
    accountListEl.classList.remove("d-none");

    const templateEl = createAccountList(accountList);

    const swiperWrapperEl = document.querySelector(".swiper-wrapper");
    swiperWrapperEl.append(templateEl.content);
  }
  function renderAmountArea() {
    const areaAmountEl = document.querySelector(".area-amount > ul");

    const orderAmountEl = areaAmountEl.querySelector("#orderAmount");
    payInformation.orderAmount = paymentList.reduce((accumulator, product) => {
      const { price, quantity } = product;
      accumulator += price * quantity;
      return accumulator;
    }, 0);
    orderAmountEl.textContent = payInformation.orderAmount.toLocaleString("ko-KR");

    const originAmountEl = areaAmountEl.querySelector("#originAmount");
    payInformation.originAmount = paymentList.reduce((accumulator, product) => {
      const { price, quantity, discountRate } = product;
      // 할인율이 있으면 원가를 계산하여 누적(DB에 저장된 상품 가격은 할인율이 적용된 가격)
      accumulator +=
        (discountRate ? Math.floor((price * 100) / (100 - discountRate)) : price) * quantity;
      return accumulator;
    }, 0);
    originAmountEl.textContent = payInformation.originAmount.toLocaleString("ko-KR");

    const saledAmountEl = areaAmountEl.querySelector("#saledAmount");
    payInformation.saledAmount = payInformation.originAmount - payInformation.orderAmount;
    saledAmountEl.textContent = "-" + payInformation.saledAmount.toLocaleString("ko-KR");

    const totalAmountEl = areaAmountEl.querySelector("#totalAmount");
    payInformation.totalAmount = payInformation.orderAmount;
    totalAmountEl.textContent = payInformation.totalAmount.toLocaleString("ko-KR");

    const totalAmountInButtonEl = document.querySelector("#totalAmountInButton");
    totalAmountInButtonEl.textContent = payInformation.totalAmount.toLocaleString("ko-KR");
  }
  async function renderUserAccount() {
    const res = await getUserAccounts();
    if (!res) return;
    const accountList = res.accounts;
    accountList.length === 0 ? renderEmptyList() : renderAccountList(accountList);
  }
  function renderCouponList() {
    const coupons = getLocalStorageData(COUPONS);

    const couponSelectorTextEl = document.querySelector(".coupon-selector > span");
    couponSelectorTextEl.textContent = `사용가능 쿠폰 0장 / 전체 ${coupons?.length || 0}장`;

    const couponListEl = document.querySelector(".coupon-list");
    const templateEl = document.createElement("template");
    if (coupons) {
      coupons.forEach((coupon) => {
        templateEl.innerHTML += /* html */ `
          <li class="coupon">
            <span>${coupon.name} [${coupon.discount} 할인]</span>
          </li>
        `;
      });
      couponListEl.append(templateEl.content);
    }
  }
  function renderUserAddress() {
    const userAddress = getLocalStorageData(USER_ADDRESS);
    const destinationEl = document.querySelector(".destination");
    if (userAddress) {
      const { roadAddress, detailAddress } = userAddress;
      destinationEl.textContent = `${roadAddress}, ${detailAddress}`;
    } else {
      destinationEl.textContent = "등록된 배송지 정보가 없습니다.";
    }
  }
  function renderOrdererInformation() {
    const userInformation = getLocalStorageData(USER_INFORMATION);

    const senderEl = document.querySelector(".orderer-area .sender");
    senderEl.textContent = userInformation.displayName;

    const emailEl = document.querySelector(".orderer-area .email");
    emailEl.textContent = userInformation.email;
  }
}

function setMockData() {
  // 제품명, 가격, 수량, 썸네일이미지
  const paymentList = [
    {
      id: "7YQPOYVq4kgrNbQV04vS",
      title: "고구마깡(83g*1)",
      price: 15400,
      quantity: 1,
      thumbnailImage: "/images/product/이토엔쟈스민티.png",
    },
    {
      id: "9X6iWhN2C5KbJpS4uhDh",
      title: "둥지냉면비빔냉면(162g*32)",
      price: 51040,
      quantity: 1,
      thumbnailImage: "/images/product/파워오투복숭아자몽.png",
    },
    {
      id: "4dVCUFjymfEqskEuMAKy",
      title: "츄파춥스 사워게코(90g*124)",
      price: 57420,
      quantity: 1,
      thumbnailImage: "/images/product/오이오차녹차.png",
    },
    {
      id: "4vs61x7YOCYBHfZuIPPU",
      title: "양파링(80g*1)",
      price: 15400,
      quantity: 1,
      thumbnailImage: "/images/product/오이오차녹차.png",
    },
  ];
  const loginId = JSON.parse(localStorage.getItem("loginInfo")).loginId;
  const userData = JSON.parse(localStorage.getItem(loginId));
  localStorage.setItem(loginId, JSON.stringify({ ...userData, paymentList }));
}
