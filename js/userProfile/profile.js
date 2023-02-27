import { SORT_TYPES, getLocalStorageData } from "../localStorage/getLocalStorageData";

const { COUPONS, USER_INFO } = SORT_TYPES;

export function setProfile() {
  // 쿠폰 개수 출력
  const coupons = getLocalStorageData(COUPONS);
  const couponAmountTextEl = document.querySelector("#couponAmount");
  couponAmountTextEl.textContent = `${coupons?.length || 0} 개`;

  // 프로필 사진
  const profileImageUrl = getLocalStorageData(USER_INFO).profileImg;
  const profileImageEl = document.querySelector(".profile-image");
  profileImageEl.style.backgroundImage = profileImageUrl ? `url(${profileImageUrl})` : "url('https://yozm.wishket.com/static/img/default_avatar.png')";

  // 유저 네임
  const displayName = getLocalStorageData(USER_INFO).displayName;
  const displayNameEl = document.querySelector("#displayName");
  displayNameEl.innerHTML = `환영합니다,<br/>${displayName}님`;
}
