import { getLocalStorageData, SORT_TYPES } from "../localStorage/getLocalStorageData";

const { USER_INFORMATION } = SORT_TYPES;

export default function () {
  const paymentList = JSON.parse(localStorage.getItem("paymentList"));
  const price = paymentList.reduce((accumulator, product) => {
    accumulator += product.price * product.quantity;
    return accumulator;
  }, 0);
  const priceEl = document.querySelector(".price");
  priceEl.textContent = `${price.toLocaleString("ko-KR")}원`;

  const displayName = getLocalStorageData(USER_INFORMATION).displayName;
  const nameEl = document.querySelector(".name");
  nameEl.textContent = `${displayName}님`;
  // localStorage paymentList 비우기
  localStorage.setItem("paymentList", JSON.stringify([]));
}
