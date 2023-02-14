import { makeDOMwithProperties } from "../utils/dom.js";

export const ulEl = document.querySelector(".goods-list");
let no = 1;

export const renderGoodsList = async (itemListData, search) => {
  no = 1;

  const itemEls = itemListData.map((item) => {
    const itemEl = makeDOMwithProperties("li", {
      className: "item",
    });
    const itemCheck = makeDOMwithProperties("div", {
      className: "info item-check",
    });

    const inputCheck = makeDOMwithProperties("input", {
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

    const soldOutcheck = item.isSoldOut ? "YES" : "NO";
    itemNo.textContent = no++;
    itemId.textContent = item.id;
    itemName.textContent = item.title;
    itemImg.src = item.thumbnail;
    itemCategory.textContent = item.tags;
    itemPrice.textContent = item.price;
    itemSale.textContent = item.discountRate;
    itemOutstock.textContent = soldOutcheck;
    itemEl.dataset.id = item.id;
    itemCheck.append(inputCheck);
    itemThum.append(itemImg);
    itemEl.append(itemCheck, itemNo, itemId, itemThum, itemName, itemCategory, itemPrice, itemSale, itemOutstock);
    return itemEl;
  });

  ulEl.append(...itemEls);
  return ulEl;
};
