import { makeDOMwithProperties } from "../utils/dom.js";
export const renderGoodsList = async (router, itemListData, no) => {
  const ulEl = document.querySelector(".goods-list");
  if (no === undefined) {
    no = 1;
  } else {
    no = no;
  }
  const itemEls = itemListData.map((item) => {
    const itemEl = makeDOMwithProperties("a", {
      className: "item",
    });
    const itemCheck = makeDOMwithProperties("div", {
      className: "info item-check",
    });
    const inputCheck = makeDOMwithProperties("input", {
      className: "check-box",
      type: "checkbox",
    });
    const itemNo = makeDOMwithProperties("div", {
      className: "info item-no",
    });
    const itemId = makeDOMwithProperties("div", {
      className: "info item-number",
    });
    const itemThum = makeDOMwithProperties("div", {
      className: "info item-thumbnail",
    });
    const itemImg = makeDOMwithProperties("img", {});
    const itemName = makeDOMwithProperties("div", {
      className: "info item-name",
    });
    const itemCategory = makeDOMwithProperties("div", {
      className: "info item-category",
    });
    const itemPrice = makeDOMwithProperties("div", {
      className: "info item-price",
    });
    const itemSale = makeDOMwithProperties("div", {
      className: "info item-sale",
    });
    const itemOutstock = makeDOMwithProperties("div", {
      className: "info item-outstock",
    });
    itemEl.dataset.id = item.id;
    itemEl.setAttribute("data-navigo", "");
    itemEl.href = "product/" + item.id;
    const soldOutcheck = item.isSoldOut ? "YES" : "NO";
    itemNo.textContent = no++;
    itemId.textContent = item.id;
    itemName.textContent = item.title;
    itemImg.src = item.thumbnail;
    itemCategory.textContent = item.tags;
    itemPrice.textContent = item.price.toLocaleString();
    itemSale.textContent = item.discountRate;
    itemOutstock.textContent = soldOutcheck;
    itemCheck.append(inputCheck);
    itemThum.append(itemImg);

    itemEl.append(itemCheck, itemNo, itemId, itemThum, itemName, itemCategory, itemPrice, itemSale, itemOutstock);
    itemEl.addEventListener("click", (event) => {
      if (event.target === inputCheck) {
        return;
      }
      event.preventDefault();
      if (event.target === itemCheck) {
        return;
      } else {
        let targetID = itemEl.getAttribute("href");
        router.navigate(targetID);
      }
    });
    return itemEl;
  });

  ulEl.append(...itemEls);
  return ulEl;
};
