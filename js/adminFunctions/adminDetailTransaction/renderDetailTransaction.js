import { detailTransaction } from "../../api/detailTransactions";
import { getTransactions } from "../../api/getTransactions";
import { makeDOMwithProperties } from "../../utils/dom";

export const renderDetailTransactionPage = async (id) => {
  const productInfo = await getTransactions();
  const [renderItem] = productInfo.filter((item) => item.detailId === id.id);
  const productList = document.querySelector(".right-nav-bar");
  let koreaTime = new Date(renderItem.timePaid);
  productList.innerHTML = /* HTML */ `
    <div class="product-list-wrapper">
      <div class="product-title-wrapper">
        <div class="title-header">
          <div class="title">개별 거래 내역 관리</div>
        </div>
        <div class="button-wrapper">
          <div class="cancel"></div>
          <div class="completed"></div>
        </div>
      </div>
      <div class="bar"></div>
      <div class="product-info">
        <div class="product-info-left">
          <div class="product-thumbnail">
            <img src="${renderItem.product.thumbnail}" alt="" />
          </div>
          <div class="product-info-title">상품정보</div>
          <div class="product-id">
            <span class="tag">거래상품 ID : </span
            ><span class="id-val">${renderItem.detailId}</span>
          </div>
          <div class="product-name">
            <span class="tag">상품 이름 : </span
            ><span class="name-val">${renderItem.product.title}</span>
          </div>
          <div class="product-price">
            <span class="tag">상품 가격 : </span
            ><span class="price-val">${renderItem.product.price.toLocaleString()}</span>
          </div>
        </div>
        <div class="product-info-right">
          <div class="info-customer">
            <div class="info-customer-title">구매자 정보</div>
            <div class="customer-email">
              <span class="tag">고객 메일 : </span
              ><span class="id-val">${renderItem.user.email}</span>
            </div>
            <div class="customer-name">
              <span class="tag">고객 이름 : </span
              ><span class="id-val">${renderItem.user.displayName}</span>
            </div>
          </div>
          <div class="info-account">
            <div class="account-title">계좌 정보</div>
            <div class="customer-account">
              <span class="tag">계좌 은행 : </span
              ><span class="id-val">${renderItem.account.bankName}</span>
            </div>
            <div class="customer-bankcode">
              <span class="tag">은행 코드 : </span
              ><span class="id-val">${renderItem.account.bankCode}</span>
            </div>
            <div class="customer-accountnum">
              <span class="tag">계좌 번호 : </span
              ><span class="id-val">${renderItem.account.accountNumber}</span>
            </div>
          </div>
          <div class="info-transaction">
            <div class="transaction-title">거래 정보</div>
            <div class="transaction-time">
               <span class="tag">거래 일시 : </span
              ><span class="id-val"
                >${koreaTime.toLocaleString("ko-KR", {
                  timeZone: "Asia/Seoul",
                })}</span
              >
            </div>
            <div class="transaction-calcel">
              <span class="tag">취소 여부 : </span>
            </div>
            <div class="transaction-confirm">
              <span class="tag">완료 여부 : </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  // 거래 완료, 해제 버튼
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
    confirmInfoText.textContent = "NO";
  } else {
    confirmButtonEl.textContent = "거래완료해제";
    confirmInfoText.textContent = "YES";
  }

  confirmWrapper.append(confirmButtonEl);
  confirmInfo.append(confirmInfoText);
  confirmButtonEl.addEventListener("click", () => {
    if (cancelButtonEl.textContent === "거래취소해제") {
      Swal.fire(
        "거래상태를 확인해주세요.",
        "거래취소된 상품은 거래완료를 할 수 없습니다.",
        "error"
      );
      return;
    }
    let reservation = {
      done: !confirmIsToggled,
    };
    confirmIsToggled = !confirmIsToggled;
    confirmInfoText.textContent = confirmIsToggled ? "YES" : "NO";
    confirmButtonEl.textContent = confirmIsToggled ? "거래완료해제" : "거래완료";
    detailTransaction(reservation, renderItem.detailId);
  });

  // 거래 취소, 해제 버튼
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
    cancelInfoText.textContent = "NO";
  } else {
    cancelButtonEl.textContent = "거래취소해제";
    cancelInfoText.textContent = "YES";
  }
  cancelWrapper.append(cancelButtonEl);
  cancelInfo.append(cancelInfoText);
  cancelButtonEl.addEventListener("click", () => {
    if (confirmButtonEl.textContent === "거래완료해제") {
      Swal.fire(
        "거래완료상태를 확인해주세요.",
        "거래완료된 상품은 거래취소를 할 수 없습니다.",
        "error"
      );
      return;
    }
    let reservation = {
      isCanceled: !isToggled,
    };
    isToggled = !isToggled;
    cancelInfoText.textContent = isToggled ? "YES" : "NO";
    cancelButtonEl.textContent = isToggled ? "거래취소해제" : "거래취소";
    detailTransaction(reservation, renderItem.detailId);
  });
};
