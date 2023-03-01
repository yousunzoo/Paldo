import bannerNew from "../../../static/images/productBanner-new.png";
import bannerBest from "../../../static/images/productBanner-best.png";
import bannerFrugal from "../../../static/images/productBanner-frugal.png";
import { getProducts } from "../../api/getProducts";
import showResult from "./showResult";

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
