import { checkAuthorization } from "./api/checkAuthorization";
import swiperAction from "./library/swiper";
import { changeHeader } from "./main/changeHeader";
import setPrdList from "./main/setPrdList";

swiperAction();
window.onload = async () => {
  swiperAction();
  // 로그인 상태이면 header 바꾸기
  const isLogin = await checkAuthorization();

  if (isLogin) {
    changeHeader();
  }
  setPrdList();
};
