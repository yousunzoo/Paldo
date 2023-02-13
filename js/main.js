import { checkAuthorization } from "./api/checkAuthorization";
import { getProducts } from "./api/getProducts";
import { changeHeader } from "./main/changeHeader";
import { makeDOMwithProperties } from "./utils/dom";

// variables
const prdList1 = document.querySelector(".prd-list1 .swiper-wrapper");
const prdList2 = document.querySelector(".prd-list2 .swiper-wrapper");
const recommendList = document.querySelector(".recommend-list");
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
  const sweetsData = await getProducts(["초콜릿/캔디류"]);
  setPrdList(prdList1, drinksData);
  setPrdList(prdList2, snacksData);
  setRecommendList(sweetsData);
};

function setPrdList(prdList, data) {
  const prdlistDiv = data.map((item) => {
    const swiperDiv = makeDOMwithProperties("div", {
      className: "swiper-slide",
    });
    const discountRate = item.discountRate > 0;
    const originPrice = Math.floor(
      (item.price * 100) / (100 - item.discountRate)
    );

    swiperDiv.innerHTML = /* html */ ` 
    <a href="javascript:void(0)" data-id="${item.id}">
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
    </a>
    `;
    return swiperDiv;
  });

  prdList.innerHTML = "";
  prdList.append(...prdlistDiv);
}

function setRecommendList(data) {
  data = data.splice(0, 4);
  const recommendLis = data.map((item) => {
    const recommendLi = document.createElement("li");
    recommendLi.innerHTML = /*html*/ `
    <a href="javascript:void(0)" class="recommend-product" data-id="${item.id}">
    <div class="thumbnail">
      <img
        src="${item.thumbnail}"
        alt="${item.title}" />
    </div>
    <div class="product-info">
      <p class="product-name">${item.title}</p>
      <p class="product-price">
        <span class="sales-price">${item.price.toLocaleString()}</span>원
      </p>
    </div>
    <button class="add-cart-btn"></button>
  </a>`;
    return recommendLi;
  });
  recommendList.innerHTML = "";
  recommendList.append(...recommendLis);
}
