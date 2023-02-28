import changeTabs from "./changeTabs";
import setProductList from "./setProductList";

export default function showResult(searchResult, originResult, router) {
  const amount = document.querySelector(".count");
  amount.textContent = searchResult.length;
  setProductList(searchResult, "최신순", originResult, router);
  changeTabs(searchResult, originResult, router);
}
