import { checkAuthorization } from "../../api/checkAuthorization";
import { SORT_TYPES, getLocalStorageData } from "../../utils/localStorage/getLocalStorageData";

const { COUPONS, USER_INFORMATION } = SORT_TYPES;

export async function setProfile() {
  const isLogin = await checkAuthorization();
  if (!isLogin) return;
  // 쿠폰 개수 출력
  const coupons = getLocalStorageData(COUPONS);
  const couponAmountTextEl = document.querySelector("#couponAmount");
  couponAmountTextEl.textContent = `${coupons?.length || 0} 개`;

  // 프로필 사진
  const profileImageUrl = getLocalStorageData(USER_INFORMATION).profileImg;
  const profileImageEl = document.querySelector(".profile-image");
  profileImageEl.style.backgroundImage = profileImageUrl
    ? `url(${profileImageUrl})`
    : "url('https://yozm.wishket.com/static/img/default_avatar.png')";

  // 유저 네임
  const displayName = getLocalStorageData(USER_INFORMATION).displayName;
  const displayNameEl = document.querySelector("#displayName");
  displayNameEl.innerHTML = `환영합니다,<br/>${displayName}님`;
}
