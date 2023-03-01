import { getProducts } from "../../api/getProducts";
import setMainProductList from "./setMainProductList";
import setRecommendList from "./setRecommendList";

export default async function setProductList(router) {
  // variables
  const productList1 = document.querySelector(".product-list1 .swiper-wrapper");
  const productList2 = document.querySelector(".product-list2 .swiper-wrapper");
  const recommendList = document.querySelector(".recommend-list");
  // 서버로부터 상품 정보 받아와서 productList1, productList2 세팅하기
  const drinksData = await getProducts("", ["음료"]);
  const snacksData = await getProducts("", ["스낵"]);
  const sweetsData = await getProducts("", ["초콜릿/캔디류"]);

  setMainProductList(productList1, drinksData, router);
  setMainProductList(productList2, snacksData, router);
  setRecommendList(recommendList, sweetsData, router);
}
