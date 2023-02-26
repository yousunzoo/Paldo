import { getLocalStorageData } from "../localStorage/getLocalStorageData";
import setSidebarSwiper from "./setSidebarSwiper";

export default function setSidebar(data, router) {
  let sidebarData = getLocalStorageData("sidebarData");
  // sidebarData에 이미 데이터가 있으면 배열에서 객체 삭제하고 배열 앞에 다시 삽입
  sidebarData.forEach((item, index) => {
    if (item.id === data.id) {
      sidebarData.splice(index, 1);
    }
  });
  // 최근 본 상품은 최대 10개까지 저장 가능
  if (sidebarData.length === 10) sidebarData.pop();
  sidebarData.unshift({ id: data.id, thumbnail: data.thumbnail });
  localStorage.setItem("sidebarData", JSON.stringify(sidebarData));
  setSidebarSwiper(router);
}
