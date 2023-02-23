import { getProducts } from "../api/getProducts";
import link from "../../static/images/no-result.svg";
import moveToDetail from "../movetoProductDetail";
import { setSidebar } from "../sidebar";
import { addCart } from "../product/setProductDetailPage";

export default async function setResultPage(keyword, router) {
  const searchResult = await getProducts(keyword);
  const originResult = [...searchResult];
  showResult(searchResult, originResult, keyword, router);
  const searchInput = document.querySelector("#gnbSearch");
  searchInput.value = "";
}

function showResult(searchResult, originResult, keyword, router) {
  const keywordTitle = document.querySelector(".product-page-title");
  const amount = document.querySelector(".count");
  keywordTitle.textContent = keyword;
  const productWrapperDiv = document.querySelector(".product-wrapper");
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
  amount.textContent = searchResult.length;
  setProductList(searchResult, "최신순", originResult, router);
  changeTabs(searchResult, originResult);
}

function setProductList(prdList, sort, originResult, router) {
  const productWrapperDiv = document.querySelector(".product-wrapper");
  let newArr;
  switch (sort) {
    case "최신순":
      newArr = originResult;
      break;
    case "낮은 가격순":
      newArr = prdList.sort((a, b) => {
        return a.price - b.price;
      });
      break;
    case "높은 가격순":
      newArr = prdList.sort((a, b) => {
        return b.price - a.price;
      });
      break;
    case "할인율순":
      newArr = prdList.sort((a, b) => {
        return b.discountRate - a.discountRate;
      });
      break;
  }
  const productListUi = productWrapperDiv.querySelector(".product-list");

  const productEls = newArr.map((item) => {
    const productEl = document.createElement("li");

    const discountRate = item.discountRate > 0;
    const originPrice = Math.floor(
      (item.price * 100) / (100 - item.discountRate)
    );

    productEl.innerHTML = /*html */ `
      <a href="productDetail/${item.id}" data-id="${item.id}">
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

    const cartButton = productEl.querySelector(".add-cart-btn");
    productEl.querySelector("a").addEventListener("click", function (event) {
      if (event.target === cartButton) {
        event.preventDefault();
        addCart(item);
        return;
      }
      moveToDetail(event, this, router);
      setSidebar(item);
    });
    return productEl;
  });
  productListUi.innerHTML = "";
  productListUi.append(...productEls);
}

function changeTabs(searchResult, originResult) {
  // sort 탭 클릭 시 정렬 방식 변경
  const sortTabButtons = document.querySelectorAll(".sort-tab button");
  sortTabButtons.forEach((item) => {
    item.addEventListener("click", () => {
      const otherButtons = [...sortTabButtons].filter(
        (button) => button != item
      );
      otherButtons.forEach((item) => {
        item.parentElement.classList.contains("selected") &&
          item.parentElement.classList.remove("selected");
      });
      item.parentElement.classList.add("selected");
      const sort = item.textContent;
      setProductList(searchResult, sort, originResult);
    });
  });
}
