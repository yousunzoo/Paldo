import { addDataInfoSend } from "../adminCommon/addDataInfoSend";
import { addProduct } from "../../api/addProduct";
export const renderAddPage = (router) => {
  const inputPrice = document.querySelector(".product-price");
  const inputSale = document.querySelector(".product-sale");
  const cost = document.querySelector(".sale-cost");
  const thumbnailImg = document.querySelector(".thumbnail");
  const detailIng = document.querySelector(".detail");

  const resButton = document.querySelector(".res-button");
  resButton.addEventListener("click", (event) => {
    try {
      addDataInfoSend(addProduct);
      setTimeout(() => {
        event.preventDefault();
        router.navigate("/product");
      }, 2000);
    } catch {
      Swal.fire("등록할 수 없습니다.", "상품 정보를 다시 확인해주세요.", "question");
    }
  });

  const salebutton = document.querySelector(".product-sale");
  salebutton.addEventListener("input", function () {
    if (this.value > 100) {
      this.value = this.value.slice(0, -1);
    }
  });

  let currentDiscount = 0;
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

  //
  const inputThumb = document.querySelector(".product-thumbnail");
  inputThumb.addEventListener("change", () => {
    const maxSize = 1 * 1024 * 1024;
    const fileSize = inputThumb.files[0].size;
    if (fileSize > maxSize) {
      Swal.fire("파일크기를 확인해주세요.", "썸네일 파일은 1MB 이하만 등록이 가능합니다.", "error");
      false;
    }
    const file = inputThumb.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", (e) => {
      thumbnailImg.src = e.target.result;
    });
  });

  const inputDetail = document.querySelector(".product-detail");
  inputDetail.addEventListener("change", () => {
    const maxSize = 4 * 1024 * 1024;
    const fileSize = inputDetail.files[0].size;
    if (fileSize > maxSize) {
      Swal.fire("파일크기를 확인해주세요.", "썸네일 파일은 4MB 이하만 등록이 가능합니다.", "error");
      false;
    }
    const file = inputDetail.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", (e) => {
      detailIng.src = e.target.result;
    });
  });
};
