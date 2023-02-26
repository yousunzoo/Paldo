import bannerNew from "../../static/images/productBanner-new.png";
import bannerBest from "../../static/images/productBanner-best.png";
import bannerFrugal from "../../static/images/productBanner-frugal.png";
import { getProducts } from "../api/getProducts";
import moveToDetail from "../movetoProductDetail";
import { setSidebar } from "../sidebar";
import { addCart } from "./setProductDetailPage";

export default async function setProductPage(tag, router) {
  // 타이틀 세팅
  const keywordTitle = document.querySelector(".product-page-title");
  const productBanner = document.querySelector(".product-banner");
  let url;
  let title;
  switch (tag) {
    case "new":
      title = "신상품";
      url = bannerNew;
      break;
    case "best":
      title = "베스트";
      url = bannerBest;
      break;
    case "frugal":
      title = "알뜰쇼핑";
      url = bannerFrugal;
  }
  keywordTitle.textContent = title;
  productBanner.style.backgroundImage = `url(${url})`;

  // 상품리스트 세팅
  const searchResult = await getProducts("", tag);
  const originResult = [...searchResult];
  showResult(searchResult, originResult, router);
}

function showResult(searchResult, originResult, router) {
  const amount = document.querySelector(".count");
  amount.textContent = searchResult.length;
  setProductList(searchResult, "최신순", originResult, router);
  changeTabs(searchResult, originResult, router);
}

function setProductList(prdList, sort, originResult, router) {
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
  const productWrapperDiv = document.querySelector(".product-wrapper");
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

    // 클릭 시 해당 페이지로 이동
    const cartButton = productEl.querySelector(".add-cart-btn");
    productEl.querySelector("a").addEventListener("click", function (event) {
      // 장바구니 버튼 클릭 시 수량 1로 지정 후 장바구니에 해당 상품 담기
      if (event.target === cartButton) {
        event.preventDefault();
        addCart(item);
        return;
      }
      setSidebar(item);
      moveToDetail(event, this, router);
    });
    return productEl;
  });
  productListUi.innerHTML = "";
  productListUi.append(...productEls);
}

function changeTabs(searchResult, originResult, router) {
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
      setProductList(searchResult, sort, originResult, router);
    });
  });
}
