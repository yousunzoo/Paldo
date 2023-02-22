import { editDataInfoSend } from "../adminCommon/editDataInfoSend";
import { editProduct } from "../api/editProduct";
import { getDetailProduct } from "../api/getDetailProduct";

export const renderEditDetailPage = async (id, router) => {
  const productInfo = await getDetailProduct(id);

  const inputName = document.querySelector(".goods-name");
  const inputPrice = document.querySelector(".goods-price");
  const inputSale = document.querySelector(".goods-sale");
  const inputTag = document.querySelector(".goods-tag");
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
    router.navigate(`admin/product/${id}`);
  });

  // 수정버튼
  const editButton = document.querySelector(".edit-button");
  editButton.addEventListener("click", () => {
    try {
      editDataInfoSend(editProduct, id);
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
  const saleButtons = document.querySelector(".goods-sale");
  saleButtons.addEventListener("input", function () {
    if (this.value > 100) {
      this.value = this.value.slice(0, -1);
    }
  });

  toggleButtons.forEach((toggleButton) => {
    toggleButton.addEventListener("click", () => {
      // Get the value of the selected radio button
      const selectedValue = document.querySelector('input[name="soldout"]:checked').value;
    });
  });

  //
  const inputThumb = document.querySelector(".goods-thumbnail");
  inputThumb.addEventListener("change", () => {
    const file = inputThumb.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", (e) => {
      thumbnailImg.src = e.target.result;
    });
  });

  const inputDetail = document.querySelector(".goods-detail");
  inputDetail.addEventListener("change", () => {
    const file = inputDetail.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", (e) => {
      detailIng.src = e.target.result;
    });
  });
};
