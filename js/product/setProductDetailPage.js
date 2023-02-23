import { checkAuthorization } from "../api/checkAuthorization";
import { getProductInfo } from "../api/getProductInfo";

export default async function setProductDetailPage(id, router) {
  const productInfo = await getProductInfo(id);
  // 상품이 품절 상태일 때 품절 div 띄우기
  if (productInfo.isSoldOut) {
    const soldOutDiv = document.querySelector(".sold-out");
    soldOutDiv.style.display = "flex";
  }
  // 상품 정보 뿌리기
  const title = document.querySelector(".product-title");
  title.textContent = productInfo.title;

  const thumbnail = document.querySelector(".thumbnail img");
  thumbnail.src = productInfo.thumbnail;
  thumbnail.alt = productInfo.title;

  const price = document.querySelector(".product-price .price-num");
  price.textContent = productInfo.price.toLocaleString();

  const productDetail = document.querySelector(".detail-img img");
  productDetail.src = productInfo.photo;
  thumbnail.alt = "상품 상세정보";

  const discountRate = document.querySelector(".discount-rate");
  const originPrice = document.querySelector(".origin-price");
  if (productInfo.discountRate) {
    discountRate.querySelector("span").textContent = productInfo.discountRate;
    originPrice.querySelector("span").textContent = parseInt(
      (productInfo.price * 100) / (100 - productInfo.discountRate)
    ).toLocaleString();
  } else {
    discountRate.innerHTML = "";
    originPrice.innerHTML = "";
  }

  // btn-wrapper padding-top 조절
  const btnWrapper = document.querySelector(".btn-wrapper");
  if (productInfo.discountRate != 0) {
    btnWrapper.style.paddingTop = "145px";
  }
  const totalPrice = document.querySelector(".total-num");
  totalPrice.textContent = productInfo.price.toLocaleString();

  // 로그인한 상태이면 로그인해야 이용가능 텍스트 안보이게
  // 로그인한 상태이면 찜목록에 해당 제품 있는지 확인
  const wishButton = document.querySelector(".wish-btn");
  const isLogined = await checkAuthorization();
  const loginText = document.querySelector(".product-login-text");
  if (isLogined) {
    loginText.style.display = "none";
    const loginedId = JSON.parse(localStorage.getItem("loginInfo")).loginId;
    const loginedIdData = JSON.parse(localStorage.getItem(loginedId));
    let wishList = loginedIdData.wishList;
    if (!wishList) wishList = [];
    const isWished = wishList.find((item) => item.id === productInfo.id);
    if (isWished) {
      wishButton.classList.add("active");
    }
  } else {
    loginText.style.display = "block";
  }

  // 수량 조절 기능
  toggleCountButton(productInfo.price);

  // 찜하기 버튼 토글 기능
  wishButton.addEventListener("click", () => {
    // 로그인 상태가 아니면 로그인 페이지로 이동하도록
    if (!isLogined) {
      Swal.fire({
        title: "로그인하셔야 본 기능을 이용하실 수 있습니다.",
      }).then(() => {
        router.navigate("/login");
      });

      return;
    }
    const loginedId = JSON.parse(localStorage.getItem("loginInfo")).loginId;
    const loginedIdData = JSON.parse(localStorage.getItem(loginedId));
    let wishList = loginedIdData.wishList;
    const hasClass = wishButton.classList.contains("active");
    if (!wishList) {
      wishList = [];
    }
    if (hasClass) {
      wishButton.classList.remove("active");
      wishList = wishList.filter((item) => item.id != productInfo.id);
    } else {
      wishButton.classList.add("active");
      wishList.push({
        id: productInfo.id,
        title: productInfo.title,
        thumbnail: productInfo.thumbnail,
        discountRate: productInfo.discountRate,
        price: productInfo.price,
      });
    }
    loginedIdData.wishList = wishList;
    localStorage.setItem(loginedId, JSON.stringify(loginedIdData));
  });

  // 장바구니에 담기 기능
  const cartButton = document.querySelector(".cart-btn");
  cartButton.addEventListener("click", async () => {
    const quantity = document.querySelector(
      ".product-quantity .count"
    ).textContent;
    addCart(productInfo, quantity);
  });

  // 세팅되면 스피너 사라지도록
  const spinner = document.querySelector(".spinner-wrapper");
  spinner.style.display = "none";
}

function toggleCountButton(price) {
  // 버튼으로 구매할 수량 조절 및 총 구매 금액 설정
  const upButton = document.querySelector(".product-quantity .up-button");
  const downButton = document.querySelector(".product-quantity .down-button");
  const quantityDiv = document.querySelector(".product-quantity .count");
  const totalPrice = document.querySelector(".total-num");
  let quantity = 1;

  upButton.addEventListener("click", () => {
    quantity += 1;
    quantityDiv.textContent = quantity;
    totalPrice.textContent = (quantity * price).toLocaleString();
    if (quantity === 2) {
      downButton.disabled = false;
      downButton.style.opacity = 1;
    }
  });

  downButton.addEventListener("click", () => {
    quantity -= 1;
    quantityDiv.textContent = quantity;
    totalPrice.textContent = (quantity * price).toLocaleString();
    if (quantity === 1) {
      downButton.disabled = true;
      downButton.style.opacity = 0.5;
    }
  });
}

export async function addCart(product, quantity = 1) {
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
  const loginedIdData = JSON.parse(localStorage.getItem(loginedId));
  let cartList = loginedIdData.cartList;
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
