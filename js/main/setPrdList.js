import { makeDOMwithProperties } from "../utils/dom";

export function setMainPrdList(prdList, data) {
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

export function setRecommendList(prdList, data) {
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
  prdList.innerHTML = "";
  prdList.append(...recommendLis);
}
