import { checkAuthorization } from "../api/checkAuthorization";
import { getLocalStorageData } from "../localStorage/getLocalStorageData";
import { makeDOMwithProperties } from "../utils/dom";

let cartList = [];
let paymentList = [];

export default async function setCartPage(router) {
  cartList = [];
  paymentList = [];

  let cartListData = getLocalStorageData("cartList");
  let paymentListData = getLocalStorageData("paymentList");
  cartList = [...cartListData];
  paymentList = [...paymentListData];
  const cartListArea = document.querySelector(".product-list");

  let loginedId = getLocalStorageData("loginId");
  let loginedIdData = getLocalStorageData("loginIdData");

  cartListArea.innerHTML = "";

  if (cartList.length === 0) {
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
      <div class="product-thumbnail"><img src="${item.thumbnail}" alt="${item.title}" /></div>

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
      <p class="product-total-price"><span>${(item.price * item.quantity).toLocaleString()}</span>원</p>
      ${
        item.discountRate
          ? `<p class="product-origin-price">
            <span>${Math.floor((item.price * 100) / (100 - item.discountRate)).toLocaleString()}</span>원
          </p>`
          : ""
      }
    </div>
    <button
      class="product-delete-button"
      type="button"></button>
  `;

    // 체크박스 기능
    const checkboxButton = cartLi.querySelector("label");
    checkboxButton.addEventListener("click", (event) => {
      event.preventDefault();
      toggleCheckbox(item, event);
    });

    // 아이템 삭제 기능
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

    // 아이템 갯수 조절 기능
    toggleCountButton(cartLi, item);
    return cartLi;
  });
  cartListArea.append(...cartLis);

  // 전체 선택 버튼 누르면 paymentList 배열 변경 및 모든 checkList 변경
  const checkAllButton = document.querySelector("#check-all");
  const orderButton = document.querySelector(".payment-button");
  checkAllButton.addEventListener("click", (event) => {
    const isChecked = event.target.checked;
    const checkButtons = document.querySelectorAll("#check-item");

    if (isChecked) {
      paymentList = [...cartList];
      checkButtons.forEach((item) => {
        item.checked = true;
      });
      orderButton.classList.add("active");
      orderButton.querySelector("span").textContent = "주문하기";
      orderButton.disabled = false;
    } else {
      paymentList = [];
      checkButtons.forEach((item) => {
        item.checked = false;
      });
      orderButton.classList.remove("active");
      orderButton.querySelector("span").textContent = "상품을 선택해주세요";
      orderButton.disabled = true;
    }
    changeBillArea();
  });

  // 선택삭제 버튼 누르면 paymentList에 있는 제품 모두 삭제
  const deleteButton = document.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    Swal.fire({
      title: "선택한 상품을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelBUttonText: "취소",
      confirmButtonText: "확인",
    }).then((result) => {
      if (result.isConfirmed) {
        paymentList.forEach((item) => {
          cartList = cartList.filter((arrItem) => arrItem != item);
        });
        loginedIdData.cartList = cartList;
        localStorage.setItem(loginedId, JSON.stringify(loginedIdData));
        setCartPage(router);
        paymentList = [];
        const checkAllButton = document.querySelector("#check-all");
        if (checkAllButton.checked) {
          checkAllButton.checked = !checkAllButton.checked;
        }
        changeBillArea();
        orderButton.classList.remove("active");
        orderButton.querySelector("span").textContent = "상품을 선택해주세요";
        orderButton.disabled = true;
      }
    });
  });

  // 주문 버튼 누르면 payment 페이지로 이동
  orderButton.addEventListener("click", () => {
    localStorage.setItem("paymentList", JSON.stringify(paymentList));
    router.navigate("/payment");
  });
}

function toggleCheckbox(item, event) {
  const checkbox = event.target.previousElementSibling;
  const orderButton = document.querySelector(".payment-button");
  if (!checkbox.checked) {
    // 주문목록에 넣기
    paymentList.push(item);
    // 주문버튼 활성화
    if (!orderButton.classList.contains("active")) {
      orderButton.classList.add("active");
      orderButton.querySelector("span").textContent = "주문하기";
      orderButton.disabled = false;
    }
  } else {
    // 주문목록에서 해당 아이템 삭제
    paymentList = paymentList.filter((arrItem) => arrItem != item); // 주문버튼 활성화
  }

  changeBillArea();
  checkbox.checked = !checkbox.checked;
  const checkAllButton = document.querySelector("#check-all");
  if (cartList.length === paymentList.length) {
    checkAllButton.checked = true;
  } else {
    checkAllButton.checked = false;
  }
  const checkButtons = document.querySelectorAll("#check-item:checked");
  if (checkButtons.length === 0) {
    orderButton.classList.remove("active");
    orderButton.querySelector("span").textContent = "상품을 선택해주세요";
    orderButton.disabled = true;
  }
}

function changeBillArea() {
  const totalArea = document.querySelector(".cart-total");
  const totalOriginPrice = totalArea.querySelector(".origin-price").querySelector("span");
  const totalDiscountPrice = totalArea.querySelector(".discount-price").querySelector("span");
  const totalPrice = totalArea.querySelector(".total-price").querySelector("span");

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

function toggleCountButton(cartLi, item) {
  // 버튼으로 구매할 수량 조절 및 총 구매 금액 설정
  const upButton = cartLi.querySelector(".product-quantity .up-button");
  const downButton = cartLi.querySelector(".product-quantity .down-button");
  const quantityDiv = cartLi.querySelector(".product-quantity .count");
  const totalPriceText = cartLi.querySelector(".product-total-price span");
  const totalOriginPriceText = cartLi.querySelector(".product-origin-price span");
  let quantity = item.quantity;
  let originPrice = parseInt((item.price * 100) / (100 - item.discountRate));

  const loginedId = getLocalStorageData("loginedId");
  const loginedIdData = getLocalStorageData("loginIdData");

  if (quantity === 1) {
    downButton.disabled = true;
    downButton.style.opacity = 0.5;
  }

  upButton.addEventListener("click", () => {
    quantity += 1;

    // cartList, paymentList quantity 변경
    const cartListIndex = cartList.indexOf(item);
    cartList[cartListIndex].quantity = quantity;
    loginedIdData.cartList = cartList;
    localStorage.setItem(loginedId, JSON.stringify(loginedIdData));

    const checkbox = cartLi.querySelector("input");
    if (checkbox.checked) {
      const paymentListIndex = paymentList.indexOf(item);
      paymentList[paymentListIndex].quantity = quantity;
      changeBillArea();
    }

    // 텍스트 변경
    quantityDiv.textContent = quantity;
    totalPriceText.textContent = (quantity * item.price).toLocaleString();
    if (item.discountRate) {
      totalOriginPriceText.textContent = (quantity * originPrice).toLocaleString();
    }
    if (quantity === 2) {
      downButton.disabled = false;
      downButton.style.opacity = 1;
    }
  });

  downButton.addEventListener("click", () => {
    quantity -= 1;

    // cartList, paymentList quantity 변경
    const cartListIndex = cartList.indexOf(item);
    cartList[cartListIndex].quantity = quantity;
    loginedIdData.cartList = cartList;
    localStorage.setItem(loginedId, JSON.stringify(loginedIdData));

    const checkbox = cartLi.querySelector("input");
    if (checkbox.checked) {
      const paymentListIndex = paymentList.indexOf(item);
      paymentList[paymentListIndex].quantity = quantity;
      changeBillArea();
    }

    // 텍스트 변경
    quantityDiv.textContent = quantity;
    totalPriceText.textContent = (quantity * item.price).toLocaleString();
    if (item.discountRate) {
      totalOriginPriceText.textContent = (quantity * originPrice).toLocaleString();
    }
    if (quantity === 1) {
      downButton.disabled = true;
      downButton.style.opacity = 0.5;
    }
  });
}
