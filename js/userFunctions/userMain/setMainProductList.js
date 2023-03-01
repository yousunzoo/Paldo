import setSidebar from "../userSidebar/setSidebar";
import { makeDOMwithProperties } from "../../utils/dom";
import moveToDetail from "../../utils/movetoProductDetail";

export default function setMainProductList(productList, data, router) {
  const productListDiv = data.map((item) => {
    const swiperDiv = makeDOMwithProperties("div", {
      className: "swiper-slide",
    });
    const discountRate = item.discountRate > 0;
    const originPrice = Math.floor((item.price * 100) / (100 - item.discountRate));

    swiperDiv.innerHTML = /* html */ ` 
    <a href="/productDetail/${item.id}">
    <div class="image-container">
      <img src="${item.thumbnail}" alt="${item.title}">
    </div>
    <div class="product-information">
      <h3 class="product-name">${item.title}</h3>
      <div class="product-price">
        <div>
          ${discountRate ? `<span class="discount-rate">${item.discountRate}%</span>` : ""}
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

    swiperDiv.querySelector("a").addEventListener("click", function (event) {
      moveToDetail(event, this, router);
      setSidebar(item);
    });
    return swiperDiv;
  });

  productList.innerHTML = "";
  productList.append(...productListDiv);
}
