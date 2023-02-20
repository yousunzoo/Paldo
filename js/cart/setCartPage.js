import { checkAuthorization } from "../api/checkAuthorization";

export default async function setCartPage(router) {
  // 로그인 되었는지 확인
  const isLogined = await checkAuthorization();
  if (!isLogined) {
    Swal.fire({
      title: "로그인하셔야 본 기능을 이용하실 수 있습니다.",
    }).then(() => {
      router.navigate("/login");
    });

    return;
  }
  const loginedId = JSON.parse(localStorage.getItem("loginInfo")).loginId;
  const cartList = JSON.parse(localStorage.getItem(loginedId)).cartList;
  console.log(cartList);

  if (!cartList) {
    // localStorage에 cartList 없으면 없다는 정보 출력
    const cartListArea = document.querySelector(".cart-left-center");
    cartListArea.innerHTML = `<div class="no-list"><p>장바구니에 담긴 상품이 없습니다.</p></div>`;
  }
  const cartLis = cartList.map((item) => {});
}
