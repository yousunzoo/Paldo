// import { makeDOMwithProperties } from "../utils/dom.js"

import { makeDOMwithProperties } from '../utils/dom';

/* COMMON */
const $ = selector => document.querySelector(selector)

/* DOM */
const toggleOrderListEl = $('#toggleOrderList');
const toggleCouponListEl = $('#toggleCouponList');


/* EVENT LISTENER */
toggleOrderListEl.addEventListener('click', toggleOrderList());
toggleCouponListEl.addEventListener('click', toggleCouponList);

/* GLOBAL LOGIC */
setMockData();





/* FUNCTIONS */

/**
 * localStorage Mock Data Setting
 */
function setMockData () {
  // 제품명, 가격, 수량, 썸네일이미지
  const cartProduct = [
    { productId : 1, title : "감자깡", price : 7000, quantity : 1, thumbnailImage : "/images/product/감자깡.png" },
    { productId : 2, title : "감자면", price : 6000, quantity : 1, thumbnailImage : "/images/product/감자면.png" },
    { productId : 3, title : "고구마깡", price : 5000, quantity : 1, thumbnailImage : "/images/product/고구마깡.png" },
    { productId : 4, title : "둥지냉면동치미물냉면", price : 4000, quantity : 1, thumbnailImage : "/images/product/둥지냉면동치미물냉면.png" },
  ]
  localStorage.setItem('cartProduct', JSON.stringify(cartProduct))
}

function toggleOrderList() {
  let isActive = false;
  return function (event) {
    const btnEl = event.currentTarget;
    const ulEl = $('.order-list-area > ul');
    const summaryEl = $('.order-list-area > .summary');
    if(!isActive) {
      btnEl.alt = "펼치기";
      btnEl.style.transform = 'rotateX(180deg)';
      summaryEl.style.display = 'none';
      // localStorage 아이템 Get !
      const json = localStorage.getItem('cartProduct');
      let cartProduct = JSON.parse(json);
      console.log(cartProduct)
      // DOM Create & Render !
      const fragmentEl = document.createDocumentFragment();
      cartProduct.forEach(product => {
        const { title, price, quantity, thumbnailImage } = product;
        const liEl = makeDOMwithProperties('li', { className : "item" })
        const imgEl = makeDOMwithProperties('img', { "src" : thumbnailImage, "className" : "thumbnail" })
        liEl.append(imgEl);
        liEl.innerHTML += /* html */`
        <span class="title-wrapper">
            <span class="title">${title}</span>
          </span>
          <div class="quantity-wrapper">
            <span class="quantity">${quantity}</span>
            <span>개</span>
          </div>
          <span class="price-wrapper">
            <span class="price">${price}</span>
            <span>원</span>
          </span>
        `
        fragmentEl.append(liEl);
      })
      console.log(fragmentEl)
      ulEl.append(fragmentEl);
    }
    if(isActive) {
      ulEl.innerHTML = '';
      btnEl.alt = "펼치기";
      btnEl.style.transform = 'rotateX(0)';
      summaryEl.style.display = 'block';
    }
    isActive = !isActive;
  }
}

function toggleCouponList() {
  const couponListEl = $('.coupon-list');
  couponListEl.classList.toggle('opened');
}

function createProductListEl() {

}