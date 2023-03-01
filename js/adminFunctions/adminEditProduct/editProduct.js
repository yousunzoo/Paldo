import { editProduct } from "../../api/editProduct";
import { getDetailProduct } from "../../api/getDetailProduct";
import { editDataInfoSend } from "../adminCommon/editDataInfoSend";
export const renderEditDetailPage = async (id, router) => {
  const productInfo = await getDetailProduct(id);

  const inputName = document.querySelector(".product-name");
  const inputPrice = document.querySelector(".product-price");
  const inputSale = document.querySelector(".product-sale");
  const inputTag = document.querySelector(".product-tag");
  const thumbnailImg = document.querySelector(".thumbnail");
  const detailIng = document.querySelector(".detail");
  const cost = document.querySelector(".sale-cost");
  const toggleButtons = document.getElementsByName("soldout");
  inputName.value = productInfo.title;
  inputPrice.value = parseInt(productInfo.price * (1 - productInfo.discountRate / 100));
  inputTag.value = productInfo.tags;
  thumbnailImg.src = productInfo.thumbnail;
  detailIng.src = productInfo.photo;
  inputSale.value = productInfo.discountRate;
  cost.value = productInfo.price;

  // 이전페이지로 이동
  const backButton = document.querySelector(".back-button");
  backButton.addEventListener("click", function (event) {
    event.preventDefault();
    router.navigate(`/product/${id}`);
  });

  // 수정버튼
  const editButton = document.querySelector(".edit-button");
  editButton.addEventListener("click", (event) => {
    try {
      editDataInfoSend(editProduct, id);
      setTimeout(() => {
        event.preventDefault();
        router.navigate(`/product/${id}`);
      }, 2000);
    } catch {
      Swal.fire("수정할 수 없습니다.", "상품 정보를 다시 확인해주세요.", "question");
    }
  });

  let currentDiscount = productInfo.discountRate;

  inputPrice.addEventListener("keyup", () => {
    cost.value = parseInt(inputPrice.value * (1 - currentDiscount / 100));
  });
  inputSale.addEventListener("keyup", () => {
    currentDiscount = inputSale.value;
    cost.value = parseInt(inputPrice.value * (1 - currentDiscount / 100));
  });

  // 할인가 입력시 1이상 100이하 입력 가능
  const saleButtons = document.querySelector(".product-sale");
  saleButtons.addEventListener("input", function () {
    if (this.value > 100) {
      this.value = this.value.slice(0, -1);
    }
  });

  toggleButtons.forEach((toggleButton) => {
    toggleButton.addEventListener("click", () => {
      // Get the value of the selected radio button
      document.querySelector('input[name="soldout"]:checked').value;
    });
  });

  //
  const inputThumb = document.querySelector(".product-thumbnail");
  inputThumb.addEventListener("change", () => {
    const file = inputThumb.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", (e) => {
      thumbnailImg.src = e.target.result;
    });
  });

  const inputDetail = document.querySelector(".product-detail");
  inputDetail.addEventListener("change", () => {
    const file = inputDetail.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", (e) => {
      detailIng.src = e.target.result;
    });
  });
};
