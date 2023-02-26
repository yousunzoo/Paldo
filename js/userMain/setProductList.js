import { getProducts } from "../api/getProducts";
import setMainProductList from "./setMainProductList";
import setRecommendList from "./setRecommendList";

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
