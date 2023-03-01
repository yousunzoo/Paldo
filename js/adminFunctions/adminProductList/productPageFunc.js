import { getProduct } from "../../api/getProduct";
import { productFilterList } from "./productFilter";
import { productPagination } from "./productPagination";
export const productPageButton = (router) => {
  const categoryButton = document.querySelector(".button-category");
  const categoryList = document.querySelector(".category-list");
  const soldoutButton = document.querySelector(".button-soldout");
  const soldoutList = document.querySelector(".soldout-list");

  const toggleClass = (button, list) => {
    button.addEventListener("click", () => {
      list.classList.contains("active")
        ? list.classList.remove("active")
        : list.classList.add("active");
    });
    button.addEventListener("focusout", () => {
      list.classList.remove("active");
    });
  };
  toggleClass(categoryButton, categoryList);
  toggleClass(soldoutButton, soldoutList);

  // 검색 버튼 입력 했을때
  let timer;
  const inputbuttonEl = document.querySelector(".search");
  const inputEl = document.querySelector(".search-productname");
  inputEl.addEventListener("keyup", async (event) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(async function () {
      if (event.isComposing) return;
      if (event.key === "Enter") {
        const listEls = await getProduct();
        const filterRes = productFilterList(listEls, inputEl.value);
        inputEl.value = "";
        productPagination(filterRes, router);
      }
    }, 200);
  });

  inputbuttonEl.addEventListener("click", async () => {
    const listEls = await getProduct();
    const filterRes = productFilterList(listEls, inputEl.value);
    productPagination(filterRes, router);
  });
};
