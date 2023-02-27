import { getProducts } from "../api/getProducts";
import link from "../../static/images/no-result.svg";
import changeTabs from "./changeTabs";
import setSearchProductList from "./setSearchProductList";

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
  setSearchProductList(searchResult, "최신순", originResult, router);
  changeTabs(searchResult, originResult, router);
}
