import addCart from "../utils/addCart";
import setSidebar from "../userSidebar/setSidebar";
import moveToDetail from "../utils/movetoProductDetail";

export default function setSearchProductList(productList, sort, originResult, router) {
  let newArr;
  switch (sort) {
    case "최신순":
      newArr = originResult;
      break;
    case "낮은 가격순":
      newArr = productList.sort((a, b) => {
        return a.price - b.price;
      });
      break;
    case "높은 가격순":
      newArr = productList.sort((a, b) => {
        return b.price - a.price;
      });
      break;
    case "할인율순":
      newArr = productList.sort((a, b) => {
        return b.discountRate - a.discountRate;
      });
      break;
  }
  const productListUl = document.querySelector(".product-list");

  const productEls = newArr.map((item) => {
    const productEl = document.createElement("li");

    const discountRate = item.discountRate > 0;
    const originPrice = Math.floor((item.price * 100) / (100 - item.discountRate));

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
                        ${discountRate ? `<span class="discount-rate">${item.discountRate}%</span>` : ""}
                        <span class="sales-price">${item.price.toLocaleString()}원</span>
                      </div>
                      <div>
                      ${discountRate ? `<span class="dimmed-price">${originPrice.toLocaleString()}원</span>` : ""}
                      </div>
                    </div>
                  </div>
                </a>`;

    const cartButton = productEl.querySelector(".add-cart-btn");
    productEl.querySelector("a").addEventListener("click", function (event) {
      if (event.target === cartButton) {
        event.preventDefault();
        addCart(item, 1, router);
        return;
      }
      moveToDetail(event, this, router);
      setSidebar(item);
    });
    return productEl;
  });
  productListUl.innerHTML = "";
  productListUl.append(...productEls);
  const loadingDiv = document.querySelector(".spinner-wrapper");
  loadingDiv.style.display = "none";
}
