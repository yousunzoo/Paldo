import { checkAuthorization } from "../api/checkAuthorization";
export default function handleCouponButton(router) {
  const getCouponButton = document.querySelector(".get-coupon-button");
  const coupons = [
    { name: "팔도 제품 최대 2만원 할인", discount: "10%" },
    { name: "팔도 제품 최대 2만원 할인", discount: "7%" },
    { name: "삼양 제품 최대 할인 쿠폰", discount: "3만원" },
    { name: "삼양 제품 최대 할인 쿠폰", discount: "2만원" },
    { name: "팔도 제품 최대 할인 쿠폰", discount: "1만원" },
  ];
  const loginInfo = localStorage.getItem("loginInfo");
  if (loginInfo) {
    const loginId = JSON.parse(loginInfo).loginId;
    const loginIdData = JSON.parse(localStorage.getItem(loginId));
    const hasCoupon = loginIdData.coupons;

    // localStorage에 coupon 데이터 있으면 버튼 비활성화
    if (hasCoupon) {
      getCouponButton.classList.add("disabled");
      getCouponButton.textContent = "쿠폰팩 발급 완료";
    }
  }

  // 클릭 시 localStorage에 쿠폰 데이터 추가
  getCouponButton.addEventListener("click", async () => {
    const islogined = await checkAuthorization();
    if (!islogined) {
      Swal.fire({
        title: "로그인하셔야 본 기능을 이용하실 수 있습니다.",
      }).then(() => {
        router.navigate("/login");
      });
      return;
    }
    if (getCouponButton.classList.contains("disabled")) return;

    const loginInfo = localStorage.getItem("loginInfo");

    const loginId = JSON.parse(loginInfo).loginId;
    const loginIdData = JSON.parse(localStorage.getItem(loginId));
    loginIdData.coupons = coupons;
    localStorage.setItem(loginId, JSON.stringify(loginIdData));

    getCouponButton.classList.add("disabled");
    getCouponButton.textContent = "쿠폰팩 발급 완료";
  });
}
