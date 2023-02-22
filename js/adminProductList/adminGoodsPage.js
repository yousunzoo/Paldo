export const categoryBtn = document.querySelector(".btn-category");
export const categoryList = document.querySelector(".category-list");
export const soldoutBtn = document.querySelector(".btn-soldout");
export const soldoutList = document.querySelector(".soldout-list");

export const toggleClass = (btn, list) => {
  btn.addEventListener("click", () => {
    list.classList.contains("active") ? list.classList.remove("active") : list.classList.add("active");
  });
  btn.addEventListener("focusout", () => {
    list.classList.remove("active");
  });
};
