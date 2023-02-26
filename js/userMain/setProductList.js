import { makeDOMwithProperties } from "../utils/dom";
import { getProducts } from "../api/getProducts";
import moveToDetail from "../utils/movetoProductDetail";
import { setSidebar } from "../userSidebar/sidebar";
import { addCart } from "../userProduct/setProductDetailPage";

export default async function setProductList(router) {
  // variables
  const prdList1 = document.querySelector(".prd-list1 .swiper-wrapper");
  const prdList2 = document.querySelector(".prd-list2 .swiper-wrapper");
  const recommendList = document.querySelector(".recommend-list");
  // 서버로부터 상품 정보 받아와서 prdList1, prdList2 세팅하기
  const drinksData = await getProducts("", ["음료"]);
  const snacksData = await getProducts("", ["스낵"]);
  const sweetsData = await getProducts("", ["초콜릿/캔디류"]);

  setMainProductList(prdList1, drinksData, router);
  setMainProductList(prdList2, snacksData, router);
  setRecommendList(recommendList, sweetsData, router);
}

function setMainProductList(prdList, data, router) {
  const prdlistDiv = data.map((item) => {
    const swiperDiv = makeDOMwithProperties("div", {
      className: "swiper-slide",
    });
    const discountRate = item.discountRate > 0;
    const originPrice = Math.floor(
      (item.price * 100) / (100 - item.discountRate)
    );

    swiperDiv.innerHTML = /* html */ ` 
    <a href="/productDetail/${item.id}">
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

    swiperDiv.querySelector("a").addEventListener("click", function (event) {
      moveToDetail(event, this, router);
      setSidebar(item);
    });
    return swiperDiv;
  });

  prdList.innerHTML = "";
  prdList.append(...prdlistDiv);
}

function setRecommendList(prdList, data, router) {
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
    <div class="product-info">
      <p class="product-name">${item.title}</p>
      <p class="product-price">
        <span class="sales-price">${item.price.toLocaleString()}</span>원
      </p>
    </div></a>
    <button class="add-cart-btn"></button>
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
  prdList.innerHTML = "";
  prdList.append(...recommendLis);
}
