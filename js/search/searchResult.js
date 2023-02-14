// localStorage에서 검색어 불러와서 실행

import { getProducts } from "../api/getProducts";
import link from "../../static/images/no-result.svg";

const keyword = localStorage.getItem("searchKeyword");

window.onload = async () => {
  const searchResult = await getProducts(keyword);
  showResult(searchResult);
};

function showResult(searchResult) {
  const keywordTitle = document.querySelector(".product-title");
  const productWrapperDiv = document.querySelector(".product-wrapper");
  keywordTitle.textContent = keyword;
  if (searchResult.length > 0) {
    keywordTitle.innerHTML = /* html */ `
    "<span class="search-word">${keyword}</span>"에 대한 검색결과`;
  } else {
    keywordTitle.innerHTML = /* html */ `
    "<span class="search-word">${keyword}</span>"에 대한 검색결과가 없습니다.`;
    productWrapperDiv.innerHTML = /* html */ `
    <div class="no-result">
      <img src="${link}" alt="no results" />
      <p>검색된 상품이 없습니다.</p>
    </div>
    `;
  }
}
