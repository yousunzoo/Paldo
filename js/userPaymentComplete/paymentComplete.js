export function setPaymentCompletePage() {
  const queryString = window.location.search;
  const parsedQueryString = queryString.match(/(?<==)[^&]+/g);
  console.log(parsedQueryString)

  const { totalPrice, username } = parseQueryString
  // 총 주문 금액
  
  const priceTextEl = document.querySelector('.price');
  priceTextEl.textContent = `${totalPrice}원`
}