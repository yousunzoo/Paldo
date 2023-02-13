import { checkAuthorization } from "./api/checkAuthorization";
import { getProducts } from "./api/getProducts";
import { changeHeader } from "./main/changeHeader";
import { makeDOMwithProperties } from "./utils/dom";

// variables
const prdList1 = document.querySelector(".prd-list1 .swiper-wrapper");
const prdList2 = document.querySelector(".prd-list2 .swiper-wrapper");

document.addEventListener("DOMContentLoaded", async () => {
  const isLogin = await checkAuthorization();

  if (isLogin) {
    changeHeader();
  }
});

// 서버로부터 상품 정보 받아와서 prdList1, prdList2 세팅하기
window.onload = async () => {
  const drinksData = await getProducts(["음료"]);
  const snacksData = await getProducts(["스낵"]);
  setPrdlist(prdList1, drinksData);
  setPrdlist(prdList2, snacksData);
};

function setPrdlist(prdList, data) {
  const prdlistDiv = data.map((item) => {
    const swiperDiv = makeDOMwithProperties("div", {
      className: "swiper-slide",
    });
    swiperDiv.dataset.id = item.id;
    const discountRate = item.discountRate > 0;
    const originPrice = Math.floor(
      (item.price * 100) / (100 - item.discountRate)
    );

    swiperDiv.innerHTML = /* html */ ` 
    <div class="image-container">
      <img src="${item.thumbnail}" alt="${item.title}">
    </div>
    <div class="product-info">
      <h3 class="product-name">${item.title}</h3>
      <div class="product-price">
        <div>
          ${
            discountRate
              ? `<span class="discount-rate">${item.discountRate}%</span>`
              : ""
          }
          <span class="sales-price">${item.price.toLocaleString()}원<span>
        </div>
        <div>
          ${
            discountRate
              ? `<span class="dimmed-price">${originPrice.toLocaleString()}원</span>`
              : ""
          }
        </div>
      </div>
    </div>
    `;
    return swiperDiv;
  });
  prdList.append(...prdlistDiv);
}
