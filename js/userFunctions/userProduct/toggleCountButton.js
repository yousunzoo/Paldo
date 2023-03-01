export default function toggleCountButton(price) {
  // 버튼으로 구매할 수량 조절 및 총 구매 금액 설정
  const upButton = document.querySelector(".product-quantity .up-button");
  const downButton = document.querySelector(".product-quantity .down-button");
  const quantityDiv = document.querySelector(".product-quantity .count");
  const totalPrice = document.querySelector(".total-num");
  let quantity = 1;

  upButton.addEventListener("click", () => {
    quantity += 1;
    quantityDiv.textContent = quantity;
    totalPrice.textContent = (quantity * price).toLocaleString();
    if (quantity === 2) {
      downButton.disabled = false;
      downButton.style.opacity = 1;
    }
  });

  downButton.addEventListener("click", () => {
    quantity -= 1;
    quantityDiv.textContent = quantity;
    totalPrice.textContent = (quantity * price).toLocaleString();
    if (quantity === 1) {
      downButton.disabled = true;
      downButton.style.opacity = 0.5;
    }
  });
}
