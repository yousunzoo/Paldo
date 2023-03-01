import { sidebarAction } from "../../library/swiper";
import { getLocalStorageData } from "../../utils/localStorage/getLocalStorageData";
import { makeDOMwithProperties } from "../../utils/dom";
import moveToDetail from "../../utils/movetoProductDetail";
import setSidebar from "./setSidebar";

export default function setSidebarSwiper(router) {
  const sidebarData = getLocalStorageData("sidebarData");
  const swiperWrapperDiv = document.querySelector("#sidebar-area .swiper-wrapper");
  if (sidebarData.length === 0) {
    const swiperDiv = makeDOMwithProperties("div", {
      className: "no-sidebar-data",
      textContent: "최근 본 상품이 없습니다",
    });

    swiperWrapperDiv.innerHTML = ``;
    swiperWrapperDiv.append(swiperDiv);
  } else {
    const swiperDivs = sidebarData.map((item) => {
      const swiperDiv = makeDOMwithProperties("div", {
        className: "swiper-slide",
      });
      swiperDiv.innerHTML = `<a href="productDetail/${item.id}" data-navigo><img src="${item.thumbnail}" alt="${item.title}"/></a>`;
      swiperDiv.querySelector("a").addEventListener("click", function (event) {
        setSidebar(item, router);
        moveToDetail(event, this, router);
      });
      return swiperDiv;
    });

    swiperWrapperDiv.innerHTML = ``;
    swiperWrapperDiv.append(...swiperDivs);
    sidebarAction();
  }
}
