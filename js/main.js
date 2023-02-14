import { checkAuthorization } from "./api/checkAuthorization";
import { getProducts } from "./api/getProducts";
import { changeHeader } from "./main/changeHeader";
import { setMainPrdList, setRecommendList } from "./main/setPrdList";

// variables
const prdList1 = document.querySelector(".prd-list1 .swiper-wrapper");
const prdList2 = document.querySelector(".prd-list2 .swiper-wrapper");
const recommendList = document.querySelector(".recommend-list");
const searchForm = document.querySelector("form.search");

window.onload = async () => {
  // 로그인 상태이면 header 바꾸기
  const isLogin = await checkAuthorization();

  if (isLogin) {
    changeHeader();
  }

  // 서버로부터 상품 정보 받아와서 prdList1, prdList2 세팅하기
  const drinksData = await getProducts("", ["음료"]);
  const snacksData = await getProducts("", ["스낵"]);
  const sweetsData = await getProducts("", ["초콜릿/캔디류"]);
  setMainPrdList(prdList1, drinksData);
  setMainPrdList(prdList2, snacksData);
  setRecommendList(recommendList, sweetsData);
};

// searchForm 제출 시 localStorage에 검색어 저장 및 페이지 이동
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const keyword = searchForm.querySelector("input").value;
  if (!keyword) return;
  localStorage.setItem("searchKeyword", keyword);
  location.href = "./search-result.html";
});
