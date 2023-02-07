/* COMMON */
const $ = selector => document.querySelector(selector)

/* DOM */
const showTogglerEl = $('#showToggler');
console.log(showTogglerEl)

showTogglerEl.addEventListener('click', toggleOrderList())

function toggleOrderList() {
  let isActive = false;
  return function (event) {
    const btnEl = event.currentTarget;
    const ulEl = $('.area-order-list > ul')
    const summaryEl = $('.area-order-list > .summary')
    if(!isActive) {
      ulEl.innerHTML = "활성화 상태입니다."
      btnEl.alt = "펼치기"
      btnEl.style.transform = "rotateX(180deg)"
      summaryEl.style.display = "none"
    }
    if(isActive) {
      ulEl.innerHTML = '';
      btnEl.alt = "펼치기"
      btnEl.style.transform = "rotateX(0)"
      summaryEl.style.display = "block"
    }
    isActive = !isActive;

    // localStorage 아이템 Get !
    // DOM Create !
    // -> Render DOM Element !
  }
}