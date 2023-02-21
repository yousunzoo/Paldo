import { checkAuthorization } from "../api/checkAuthorization";
import { makeDOMwithProperties } from "../utils/dom";

let cartList = [];
let paymentList = [];

export default async function setCartPage(router) {
  // 로그인 되었는지 확인
  const isLogined = await checkAuthorization();
  if (!isLogined) {
    Swal.fire({
      title: "로그인하셔야 본 기능을 이용하실 수 있습니다.",
    }).then(() => {
      router.navigate("/login");
    });

    return;
  }
  const loginedId = JSON.parse(localStorage.getItem("loginInfo")).loginId;
  const loginedIdData = JSON.parse(localStorage.getItem(loginedId));
  let cartListData = loginedIdData.cartList;
  cartList = [...cartListData];
  const cartListArea = document.querySelector(".product-list");

  cartListArea.innerHTML = "";

  if (!cartList || cartList.length === 0) {
    // localStorage에 cartList 없으면 없다는 정보 출력
    cartListArea.innerHTML = `<div class="no-list"><p>장바구니에 담긴 상품이 없습니다.</p></div>`;
  }
  const cartLis = cartList.map((item) => {
    const cartLi = makeDOMwithProperties("li", { className: "product-li" });
    cartLi.innerHTML = `
    <label for="check-item" class="check-item-area">
      <input type="checkbox" id="check-item" />
      <div class="checkbox-icon"></div>
    </label>
    <a href="/productDetail/${item.id}" class="product-area" data-navigo>
      <div class="product-thumbnail"><img src="${item.thumbnail}" alt="${
      item.title
    }" /></div>

      <div class="product-detail-title">
        <p class="product-title-text">${item.title}</p>
      </div>
    </a>
    <div class="product-quantity">
      <button class="down-button">-</button>
      <div class="count">${item.quantity}</div>
      <button class="up-button">+</button>
    </div>
    <div class="product-price">
      <p class="product-total-price"><span>${(
        item.price * item.quantity
      ).toLocaleString()}</span>원</p>
      ${
        item.discountRate
          ? `<p class="product-origin-price">
            <span>${Math.floor(
              (item.price * 100) / (100 - item.discountRate)
            ).toLocaleString()}</span>원
          </p>`
          : ""
      }
    </div>
    <button
      class="product-delete-button"
      type="button"></button>
  `;

    // 체크박스 기능 구현
    const checkboxButton = cartLi.querySelector("label");
    checkboxButton.addEventListener("click", (event) => {
      event.preventDefault();
      toggleCheckbox(item, event);
    });

    // 아이템 삭제 기능 구현
    const deleteButton = cartLi.querySelector(".product-delete-button");
    deleteButton.addEventListener("click", () => {
      Swal.fire({
        title: "삭제하시겠습니까?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelBUttonText: "취소",
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.isConfirmed) {
          cartList = cartList.filter((arrItem) => arrItem != item);
          loginedIdData.cartList = cartList;
          localStorage.setItem(loginedId, JSON.stringify(loginedIdData));
          setCartPage(router);
        }
      });
    });

    return cartLi;
  });
  cartListArea.append(...cartLis);

  // 전체 선택 버튼 누르면 paymentList 배열 변경 및 모든 checkList 변경
  const checkAllButton = document.querySelector("#check-all");
  const checkButtons = document.querySelectorAll("#check-item");
  checkAllButton.addEventListener("click", (event) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      paymentList = [...cartList];
      checkButtons.forEach((item) => {
        item.checked = true;
      });
    } else {
      paymentList = [];
      checkButtons.forEach((item) => {
        item.checked = false;
      });
    }
    changeBillArea(paymentList);
  });
}

function toggleCheckbox(item, event) {
  const checkbox = event.target.previousElementSibling;
  if (!checkbox.checked) {
    // 주문목록에 넣기
    paymentList.push(item);
  } else {
    // 주문목록에서 해당 아이템 삭제
    paymentList = paymentList.filter((arrItem) => arrItem != item);
  }

  changeBillArea(paymentList);
  checkbox.checked = !checkbox.checked;
  if (cartList.length === paymentList.length) {
    const checkAllButton = document.querySelector("#check-all");
    checkAllButton.checked = true;
  }
}

function changeBillArea(paymentList) {
  const totalArea = document.querySelector(".cart-total");
  const totalOriginPrice = totalArea
    .querySelector(".origin-price")
    .querySelector("span");
  const totalDiscountPrice = totalArea
    .querySelector(".discount-price")
    .querySelector("span");
  const totalPrice = totalArea
    .querySelector(".total-price")
    .querySelector("span");

  let origin = 0;
  let discount = 0;
  let total = 0;
  paymentList.forEach((item) => {
    origin += ((item.price * 100) / (100 - item.discountRate)) * item.quantity;
    total += item.price * item.quantity;
    discount = origin - total;
  });
  totalOriginPrice.textContent = parseInt(origin).toLocaleString();
  totalDiscountPrice.textContent = parseInt(discount).toLocaleString();
  totalPrice.textContent = total.toLocaleString();
}
