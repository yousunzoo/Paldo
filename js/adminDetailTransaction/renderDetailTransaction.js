import { detailTransaction } from "../api/detailTransactions";
import { getTransactions } from "../api/getTransactions";
import { makeDOMwithProperties } from "../utils/dom";

export const renderDetailTransactionPage = async (id, router) => {
  const productInfo = await getTransactions();

  const [renderItem] = productInfo.filter((item) => item.detailId === id.id);
  const goodsList = document.querySelector(".right-nav-bar");
  goodsList.innerHTML = /* HTML */ `
    <div class="goods-list-wrapper">
      <div class="goods-title-wrapper">
        <div class="title-header">
          <div class="title">개별 거래 내역 관리</div>
        </div>
        <div class="button-wrapper">
          <div class="cancel"></div>
          <div class="completed"></div>
        </div>
      </div>
      <div class="bar"></div>
      <div class="goods-info">
        <div class="goods-info-left">
          <div class="goods-thumbnail">
            <img src="${renderItem.product.thumbnail}" alt="" />
          </div>
          <div class="goods-info-title">상품정보</div>
          <div class="goods-id"><span class="tag">거래상품 ID : </span><span class="id-val">${renderItem.detailId}</span></div>
          <div class="goods-name"><span class="tag">상품 이름 : </span><span class="name-val">${renderItem.product.title}</span></div>
          <div class="goods-price"><span class="tag">상품 가격 : </span><span class="price-val">${renderItem.product.price.toLocaleString()}</span></div>
        </div>
        <div class="goods-info-right">
          <div class="info-customer">
            <div class="info-customer-title">구매자 정보</div>
            <div class="customer-email"><span class="tag">고객 메일 : </span><span class="id-val">${renderItem.user.email}</span></div>
            <div class="customer-name"><span class="tag">고객 이름 : </span><span class="id-val">${renderItem.user.displayName}</span></div>
          </div>
          <div class="info-account">
            <div class="account-title">계좌 정보</div>
            <div class="customer-account"><span class="tag">계좌 은행 : </span><span class="id-val">${renderItem.account.bankName}</span></div>
            <div class="customer-bankcode"><span class="tag">은행 코드 : </span><span class="id-val">${renderItem.account.bankCode}</span></div>
            <div class="customer-accountnum"><span class="tag">계좌 번호 : </span><span class="id-val">${renderItem.account.accountNumber}</span></div>
          </div>
          <div class="info-transaction">
            <div class="transaction-title">거래 정보</div>
            <div class="transaction-time"><span class="tag">거래 일시 : </span><span class="id-val">${renderItem.timePaid}</span></div>
            <div class="transaction-calcel"><span class="tag">취소 여부 : </span></div>
            <div class="transaction-confirm"><span class="tag">완료 여부 : </span></div>
          </div>
        </div>
      </div>
    </div>
  `;

  const confirmWrapper = document.querySelector(".completed");
  const confirmInfo = document.querySelector(".transaction-confirm");
  const confirmButtonEl = makeDOMwithProperties("button", {
    className: "cancel-button",
  });
  const confirmInfoText = makeDOMwithProperties("span", {
    className: "id-val",
  });
  // 현재 거래완료값
  let confirmIsToggled = renderItem.done;
  // 만약 거래완료값이 true면? false값을 받고 완료해제 할 수 있도록
  if (!confirmIsToggled) {
    confirmButtonEl.textContent = "거래완료";
    confirmInfoText.textContent = false;
  } else {
    confirmButtonEl.textContent = "거래완료해제";
    confirmInfoText.textContent = true;
  }

  confirmWrapper.append(confirmButtonEl);
  confirmInfo.append(confirmInfoText);
  confirmButtonEl.addEventListener("click", () => {
    let reservation = {
      done: !confirmIsToggled,
    };
    console.log(reservation);
    confirmIsToggled = !confirmIsToggled;
    confirmInfoText.textContent = confirmIsToggled;
    confirmButtonEl.textContent = confirmIsToggled ? "거래완료해제" : "거래완료";
    detailTransaction(reservation, renderItem.detailId);
  });

  const cancelWrapper = document.querySelector(".cancel");
  const cancelInfo = document.querySelector(".transaction-calcel");
  const cancelButtonEl = makeDOMwithProperties("button", {
    className: "cancel-button",
  });
  const cancelInfoText = makeDOMwithProperties("span", {
    className: "id-val",
  });
  let isToggled = renderItem.isCanceled;
  if (!isToggled) {
    cancelButtonEl.textContent = "거래취소";
    cancelInfoText.textContent = false;
  } else {
    cancelButtonEl.textContent = "거래취소해제";
    cancelInfoText.textContent = true;
  }
  cancelWrapper.append(cancelButtonEl);
  cancelInfo.append(cancelInfoText);
  cancelButtonEl.addEventListener("click", () => {
    let reservation = {
      isCanceled: !isToggled,
    };
    isToggled = !isToggled;
    cancelInfoText.textContent = isToggled;
    cancelButtonEl.textContent = isToggled ? "거래취소해제" : "거래취소";
    detailTransaction(reservation, renderItem.detailId);
  });
};
