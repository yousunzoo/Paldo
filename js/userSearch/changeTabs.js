import setSearchProductList from "./setSearchProductList";

export default function changeTabs(searchResult, originResult) {
  // sort 탭 클릭 시 정렬 방식 변경
  const sortTabButtons = document.querySelectorAll(".sort-tab button");
  sortTabButtons.forEach((item) => {
    item.addEventListener("click", () => {
      const otherButtons = [...sortTabButtons].filter(
        (button) => button != item
      );
      otherButtons.forEach((item) => {
        item.parentElement.classList.contains("selected") &&
          item.parentElement.classList.remove("selected");
      });
      item.parentElement.classList.add("selected");
      const sort = item.textContent;
      setSearchProductList(searchResult, sort, originResult);
    });
  });
}
