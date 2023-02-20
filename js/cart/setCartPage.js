import { checkAuthorization } from "../api/checkAuthorization";
import { makeDOMwithProperties } from "../utils/dom";

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
  const cartList = JSON.parse(localStorage.getItem(loginedId)).cartList;

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
  const cartListArea = document.querySelector(".product-list");
  if (!cartList) {
    // localStorage에 cartList 없으면 없다는 정보 출력
    cartListArea.innerHTML = `<div class="no-list"><p>장바구니에 담긴 상품이 없습니다.</p></div>`;
  }
  const cartLis = cartList.map((item) => {
    const cardLi = makeDOMwithProperties("li", { className: "product-li" });
    cardLi.innerHTML = `
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
    const checkboxLabel = cardLi.querySelector("label");

    checkboxLabel.addEventListener("click", (event) => {
      event.preventDefault();
      const checkbox = event.target.previousElementSibling;
      const originPrice = Math.floor(
        (item.price * 100) / (100 - item.discountRate)
      );
      if (!checkbox.checked) {
        // 주문목록에 넣기
        totalOriginPrice.textContent = (
          parseInt(totalOriginPrice.textContent.replace(/,/g, "")) +
          originPrice * item.quantity
        ).toLocaleString();
        totalDiscountPrice.textContent = (
          parseInt(totalDiscountPrice.textContent.replace(/,/g, "")) +
          (originPrice - item.price) * item.quantity
        ).toLocaleString();
        totalPrice.textContent = (
          parseInt(totalPrice.textContent.replace(/,/g, "")) +
          item.price * item.quantity
        ).toLocaleString();
      } else {
        totalOriginPrice.textContent = (
          parseInt(totalOriginPrice.textContent.replace(/,/g, "")) -
          originPrice * item.quantity
        ).toLocaleString();
        totalDiscountPrice.textContent = (
          parseInt(totalDiscountPrice.textContent.replace(/,/g, "")) -
          (originPrice - item.price) * item.quantity
        ).toLocaleString();
        totalPrice.textContent = (
          parseInt(totalPrice.textContent.replace(/,/g, "")) -
          item.price * item.quantity
        ).toLocaleString();
      }
      checkbox.checked = !checkbox.checked;
    });
    return cardLi;
  });
  cartListArea.append(...cartLis);
}
