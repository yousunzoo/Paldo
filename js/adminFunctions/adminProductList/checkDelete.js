import { deleteSwal } from "../adminAddProduct/btnAlert";
import { deleteProduct } from "../../api/deleteProduct";
import { getProduct } from "../../api/getProduct";
import { productFilterList } from "./productFilter";
import { productPagination } from "./productPagination";
// 선택삭제
export const checkDelete = (ulEl, deleteButton, itemCheck, router) => {
  deleteButton.addEventListener("click", async () => {
    let count = 0;
    let checkList = [];
    itemCheck.forEach((item) => {
      if (item.closest("input").checked) {
        count += 1;
        checkList.push(item);
      }
    });

    if (count < 1) {
      Swal.fire("선택한 항목이 없습니다.", "삭제할 상품을 선택해주세요.", "question");
      return;
    } else {
      for (let item of checkList) {
        deleteProduct(item.closest(".item").getAttribute("data-id"));
      }
      deleteSwal(count);
      ulEl.innerHTML = "";
      let search;
      const listEls = await getProduct();
      const filterRes = productFilterList(listEls, search);
      productPagination(filterRes, router);
      count = 0;
      checkList = [];
      let allCheck = document.querySelector(".all-check input");
      allCheck.checked = false;
    }
  });
};

// 전체 체크
export const checkAll = (allCheck, itemCheck) => {
  allCheck.addEventListener("click", () => {
    let isChecked = allCheck.checked;
    if (true) {
      itemCheck.forEach((item) => (item.checked = isChecked));
    }
  });
};

// 체크 영역 넓힘
export function addCheckboxFunctionality() {
  const checkboxWrapper = document.querySelectorAll(".item-check");
  const myCheckbox = document.querySelectorAll(".check-box");

  checkboxWrapper.forEach(function (wrapper, i) {
    wrapper.addEventListener("click", function (event) {
      if (event.target.type !== "checkbox") {
        myCheckbox[i].checked = !myCheckbox[i].checked;
      }
    });
  });
}
