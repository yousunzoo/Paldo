import { checkAuthorization } from "../api/checkAuthorization";
import { getLocalStorageData } from "../localStorage/getLocalStorageData";

export default async function addCart(product, quantity, router) {
  const isLogined = await checkAuthorization();
  if (!isLogined) {
    Swal.fire({
      title: "로그인하셔야 본 기능을 이용하실 수 있습니다.",
    }).then(() => {
      router.navigate("/login");
    });

    return;
  }
  const loginedId = getLocalStorageData("loginId");
  let loginedIdData = getLocalStorageData("loginIdData");
  let cartList = getLocalStorageData("cartList");
  if (!cartList) {
    cartList = [];
  }
  const itemIndex = cartList.findIndex((item) => item.id === product.id);
  if (itemIndex != -1) {
    cartList[itemIndex].quantity += Number(quantity);
  } else {
    cartList.push({
      id: product.id,
      title: product.title,
      price: product.price,
      discountRate: product.discountRate,
      quantity: Number(quantity),
      thumbnail: product.thumbnail,
    });
  }
  loginedIdData.cartList = cartList;
  localStorage.setItem(loginedId, JSON.stringify(loginedIdData));
  Swal.fire({
    icon: "success",
    title: "상품이 장바구니에 담겼습니다",
    text: itemIndex != -1 ? "이미 담은 상품의 수량을 추가했습니다" : "",
  });
}
