// localStorage에서 검색어 불러와서 실행

import { getProducts } from "../api/getProducts";
import link from "../../static/images/no-result.svg";
import { makeDOMwithProperties } from "../utils/dom";

const keyword = localStorage.getItem("searchKeyword");

window.onload = async () => {
  const searchResult = await getProducts(keyword);
  showResult(searchResult);
};

function showResult(searchResult) {
  const keywordTitle = document.querySelector(".product-title");
  const productWrapperDiv = document.querySelector(".product-wrapper");
  const productListUi = productWrapperDiv.querySelector(".product-list");
  keywordTitle.textContent = keyword;
  if (searchResult.length === 0) {
    keywordTitle.innerHTML = /* html */ `
    "<span class="search-word">${keyword}</span>"에 대한 검색결과가 없습니다.`;
    productWrapperDiv.innerHTML = /* html */ `
    <div class="no-result">
      <img src="${link}" alt="no results" />
      <p>검색된 상품이 없습니다.</p>
    </div>
    `;
    return;
  }
  keywordTitle.innerHTML = /* html */ `
    "<span class="search-word">${keyword}</span>"에 대한 검색결과`;
  const productEls = searchResult.map((item) => {
    const productEl = document.createElement("li");

    const discountRate = item.discountRate > 0;
    const originPrice = Math.floor(
      (item.price * 100) / (100 - item.discountRate)
    );

    productEl.innerHTML = /*html */ `
      <a href="javascript:void(0)" data-id="${item.id}">
                  <div class="product-thumbnail">
                    <img
                      src="${item.thumbnail}"
                      alt="${item.title}" />
                    <button class="add-cart-btn">
                    </button>
                  </div>
                  <div class="product-info">
                    <p class="product-name">${item.title}</p>
                    <div class="product-price">
                      <div>
                        ${
                          discountRate
                            ? `<span class="discount-rate">${item.discountRate}%</span>`
                            : ""
                        }
                        <span class="sales-price">${item.price.toLocaleString()}원</span>
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
                </a>`;

    return productEl;
  });
  productListUi.append(...productEls);
}
