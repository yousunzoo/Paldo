import addCart from "../../utils/addCart";
import { makeDOMwithProperties } from "../../utils/dom";
import moveToDetail from "../../utils/movetoProductDetail";
import setSidebar from "../userSidebar/setSidebar";

export default function setRecommendList(productList, data, router) {
  data = data.splice(0, 4);
  const recommendLis = data.map((item) => {
    const recommendLi = makeDOMwithProperties("li", {
      className: "recommend-product",
    });
    recommendLi.innerHTML = /*html*/ `
    <a href="productDetail/${item.id}" data-id="${item.id}">
    <div class="thumbnail">
      <img
        src="${item.thumbnail}"
        alt="${item.title}" />
    </div>
    <div class="product-information">
      <p class="product-name">${item.title}</p>
      <p class="product-price">
        <span class="sales-price">${item.price.toLocaleString()}</span>원
      </p>
    </div></a>
    <button class="add-cart-button"></button>
  `;
    // 해당 li 클릭하면 상품 페이지로 이동
    recommendLi.querySelector("a").addEventListener("click", function (event) {
      moveToDetail(event, this, router);
      setSidebar(item);
    });

    // 장바구니 버튼 누르면 해당 상품 장바구니에 담기
    recommendLi.querySelector("button").addEventListener("click", () => {
      addCart(item, 1, router);
    });
    return recommendLi;
  });
  productList.innerHTML = "";
  productList.append(...recommendLis);
}
