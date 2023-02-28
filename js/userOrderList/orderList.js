import { checkAuthorization } from "../api/checkAuthorization";
import getOrderList from "../api/getOrderList";
import cancelTransaction from "../api/cancelTransaction";
import confirmTransaction from "../api/confirmTransaction";
import { makeDOMwithProperties } from "../utils/dom";

/* FUNCTIONS */
export async function setOrderListPage() {
  const isLogin = await checkAuthorization();
  if (!isLogin) return;
  // flatPickr
  flatpickr("#myDatepicker", {
    dateFormat: "Y-m-d", // set the date format
    disableMobile: true, // disable mobile optimizations
  });
  const pickerEl = document.querySelector(".flatpickr-input");
  const skeletonLoadingEl = document.querySelector(".skeleton-loading");
  const contentEl = document.querySelector(".order-list > .content");

  pickerEl.addEventListener("change", () => {
    skeletonLoadingEl.classList.add("d-none");
    initPage();
    skeletonLoadingEl.classList.remove("d-none");
  });

  initPage();

  async function initPage() {
    contentEl.innerHTML = "";

    // 사용자 전체 거래내역 조회
    const orderListData = await getOrderList();
    if (!orderListData) return;
    const data = pickerEl.value ? filterByFlatPickr(orderListData) : orderListData;

    // 거래 내역이 없을 때
    if (data.length === 0) {
      contentEl.innerHTML = /* html */ `
        <p class='no-list'>주문내역이 없습니다.</p>
      `;
      skeletonLoadingEl.classList.add("d-none");
      return;
    }

    // 거래 내역이 있을 때
    const analyzedData = analyzeOrderList(data);

    // ul 요소 생성
    const orderListUls = createOrderListUls(analyzedData);

    // 렌더링
    contentEl.append(...orderListUls);
    skeletonLoadingEl.classList.add("d-none");
  }
  function filterByFlatPickr(orderListData) {
    return orderListData.filter((order) => {
      const kstDate = new Date(order.timePaid);
      const year = kstDate.getFullYear();
      const month = kstDate.getMonth() + 1;
      const date = kstDate.getDate();
      return `${year}-${month.toString().padStart(2, "0")}-${date.toString().padStart(2, "0")}` === pickerEl.value;
    });
  }
}
export function analyzeOrderList(orderlist) {
  /* timePaid 시간 차가 5초 이내인 거래끼리 그룹핑 */
  // 내림차순 정렬
  orderlist.sort((a, b) => {
    return new Date(b.timePaid) - new Date(a.timePaid);
  });

  // 그룹핑을 위한 변수들 초기화
  let currentGroup = [orderlist[0]];
  let groupsArray = [currentGroup];

  // 객체들을 그룹핑
  for (let i = 1; i < orderlist.length; i++) {
    const currentObject = orderlist[i - 1];
    const nextObject = orderlist[i];
    const timeDifference = (new Date(currentObject.timePaid) - new Date(nextObject.timePaid)) / 1000;

    if (timeDifference < 5) {
      currentGroup.push(nextObject);
    } else {
      currentGroup = [nextObject];
      groupsArray.push(currentGroup);
    }
  }

  /* 새로운 그룹핑을 위한 변수들 초기화 (중복 제거 및 수량 체크) */
  const newGroupsArray = [];
  groupsArray.forEach((group) => {
    // group 내부의 거래 건수를 분석
    const parsedObj = group.reduce((accumulator, transaction) => {
      if (accumulator[transaction.product.productId]) {
        // 동일한 productId가 존재하면, detailId를 추가하고, quantity를 1 더해준다.
        accumulator[transaction.product.productId].detailId.push(transaction.detailId);
        accumulator[transaction.product.productId].quantity += 1;
      } else {
        // 새로운 productId라면, 새롭게 data를 추가.
        accumulator[transaction.product.productId] = {
          detailId: [transaction.detailId],
          done: transaction.done,
          isCanceled: transaction.isCanceled,
          product: transaction.product,
          timePaid: transaction.timePaid,
          quantity: 1,
        };
      }
      return accumulator;
    }, {});
    const newGroup = Object.values(parsedObj);
    newGroupsArray.push(newGroup);
  });
  return newGroupsArray;
}
function createOrderListUls(groups) {
  return groups.map((group, index) => {
    // 총 상품 금액
    const totalPrice = group.reduce((accumulator, transaction) => {
      const { product, quantity } = transaction;
      accumulator += product.price * quantity;
      return accumulator;
    }, 0);

    // timePaid 한국 시간으로 변환
    const time = new Date(group[0].timePaid).toLocaleString("ko-KR");

    // 요소 생성 !
    const orderListUl = makeDOMwithProperties("div", { className: "list-group" });
    orderListUl.innerHTML = /* html */ `
      <div class='list-title' id=${index}>
        <div class='title-information'>
          <span class='transaction-date'>${time} 결제</span>
          <span class='transaction-name'>${group[0].product.title} 포함 총 ${group.length}건</span>
          <span class='transaction-price'>${totalPrice.toLocaleString("ko-KR")}원</span>
        </div>
        <div class="spinner"></div>
      </div>
      <ul></ul>
    `;
    const orderListLi = orderListUl.querySelector(".list-title");
    orderListLi.addEventListener("click", () => {
      // 스피너 로딩
      const spinnerEl = orderListUl.querySelector(".spinner");
      spinnerEl.classList.add("active");

      // 내부에 요소가 없으면
      const ulEl = orderListLi.parentElement.querySelector("ul");
      if (!ulEl.children.length) {
        // li 요소 렌더링
        const orderListLiEls = createOrderListLis(group);
        ulEl.append(...orderListLiEls);
      }
      // 있으면 토글링만
      ulEl.style.display = ulEl.style.display === "block" ? "none" : "block";
      spinnerEl.classList.remove("active");
    });
    return orderListUl;
  });
}
function createOrderListLis(group) {
  return group.map((transaction) => {
    const { detailId, isCanceled, done, product, quantity } = transaction;
    const liEl = makeDOMwithProperties("li", { className: "item" });
    liEl.innerHTML = /* html */ `
      <div class='order-area'>
        <div class='information'>
          <img class='thumbnail' src=${product.thumbnail} alt='감자깡' height='60px' />
          <div class='information-list'>
            <dl>
              <dt>상품명</dt>
              <dd id='name'>${product.title}</dd>
            </dl>
            <dl>
              <dt>결제방법</dt>
              <dd>계좌 이체</dd>
            </dl>
            <dl>
              <dt>수량</dt>
              <dd id='quantity'>${quantity}개</dd>
            </dl>
            <dl>
              <dt>결제금액</dt>
              <dd id='transactionPrice'>${(product.price * quantity).toLocaleString("ko-KR")}원</dd>
            </dl>
          </div>
        </div>
        <div class='side-information'>
          <span>상품 준비중</span>
          <div class='buttons' data-id=${JSON.stringify(detailId)}>
            <button class='order-cancel-button ${done ? "inactive" : ""}' ${done ? "disabled" : ""}>주문 취소</button>
            <button class='order-confirm-button ${done}' ${done ? "disabled" : ""}>거래 확정</button>
          </div>
        </div>
      </div>
      <div class="cancelled ${isCanceled}"><span>주문이 취소된 상품입니다.</span></div>
    `;
    // 주문 취소 이벤트 핸들러 할당
    const orderCancelButtonEl = liEl.querySelector(".order-cancel-button");
    orderCancelButtonEl.addEventListener("click", onClickCancelButton);

    // 거래 확정 이벤트 핸들러 할당
    const orderConfirmButtonEl = liEl.querySelector(".order-confirm-button");
    orderConfirmButtonEl.addEventListener("click", onClickConfirmButton);
    return liEl;
  });
}
function onClickCancelButton(event) {
  const liEl = event.currentTarget.closest(".item");
  const buttonsEl = liEl.querySelector(".buttons");
  Swal.fire({
    title: "정말로 취소하겠습니까 ?",
    text: "취소된 주문 건은 다시 되돌릴 수 없습니다.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "확인",
    cancelButtonText: "취소",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // 주문 취소 요청 API 전송
        const transactionIds = JSON.parse(buttonsEl.dataset.id);
        const results = [];
        for (let transactionId of transactionIds) {
          const result = await cancelTransaction({ detailId: transactionId });
          results.push(result);
        }
        Promise.allSettled(results).then((results) => {
          if (!results.find((result) => result.value === false)) {
            // 삭제 요청 성공 시
            Swal.fire("취소 성공!", "주문이 성공적으로 취소되었습니다.", "success");
            // 주문 취소 관련 렌더링
            const cancelledEl = liEl.querySelector(".cancelled");
            cancelledEl.classList.remove("false");
            cancelledEl.classList.add("true");
          } else {
            throw new Error("알 수 없는 오류가 발생했습니다.");
          }
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
        console.error(error);
        return;
      }
    }
  });
}
function onClickConfirmButton(event) {
  const liEl = event.currentTarget.closest(".item");
  const buttonsEl = liEl.querySelector(".buttons");
  Swal.fire({
    title: "거래 확정하겠습니까 ?",
    text: "거래 확정 후엔 주문 취소가 불가능합니다.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "확인",
    cancelButtonText: "취소",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // 거래 확정 요청 API 전송
        const transactionIds = JSON.parse(buttonsEl.dataset.id);
        const results = transactionIds.map(async (transactionId) => {
          const res = await confirmTransaction({ detailId: transactionId });
          return res;
        });
        Promise.allSettled(results).then((results) => {
          if (!results.find((result) => result.value === false)) {
            // 거래 확정 요청 성공 시
            Swal.fire("구매 확정 성공!", "성공적으로 구매 확정되었습니다.", "success");
            // 거래 확정 관련 렌더링
            const orderConfirmButtonEl = liEl.querySelector(".order-confirm-button");
            orderConfirmButtonEl.classList.remove("false");
            orderConfirmButtonEl.classList.add("true");
            orderConfirmButtonEl.disabled = true;
            const orderCancelButtonEl = liEl.querySelector(".order-cancel-button");
            orderCancelButtonEl.classList.add("inactive");
            orderCancelButtonEl.disabled = true;
          } else {
            throw new Error("알 수 없는 오류가 발생했습니다.");
          }
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
        console.error(error);
        return;
      }
    }
  });
}
