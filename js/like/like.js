import { checkAuthorization } from '../api/checkAuthorization.js';
import { SORT_TYPES, getDataFromLocalStorage } from '../account/utils/localStorage.js'
import { makeDOMwithProperties } from '../utils/dom.js'

const { WISH, CART } = SORT_TYPES

/* GLOBAL LOGIC */
// setMockData();
;(async function () {
  const isValidUser = await checkAuthorization();
  if(isValidUser) {
    initPage();
  } else {
    Swal.fire({
      icon: 'error',
      title: '사용자 세션이 만료되었습니다.',
      text: '로그인 페이지로 이동합니다.',
    })
    // 로그인 페이지로 redirect
    // location.assign('로그인 페이지 경로')
  }
})()

function initPage() {
  // 찜목록 데이터 불러오기
  const wishList = getDataFromLocalStorage(WISH)
  const totalEl = document.querySelector('.main-text > span');
  totalEl.textContent = wishList?.length || 0;
  const containerEl = document.querySelector('.likelist-container');

    // 찜목록이 없다면
    if(!wishList?.length) {
      // skeletonLoadingEl.classList.add('d-none');
      containerEl.innerHTML = `<p class="no-list">찜한 상품이 없습니다.</p>`
      return;
    }
    // 찜목록이 있다면
    const wishListEl = createWishList(wishList)
    containerEl.innerHTML = '';
    containerEl.append(wishListEl);
}
function setMockData () {
  // 제품명, 가격, 수량, 썸네일이미지
  const wish = [
    { productId : 'xr14ikmurlABzuizuDge', title : "이토엔쟈스민티(500ml*24)", price : 37950, thumbnailImage : "/images/product/이토엔쟈스민티.png" },
    { productId : 'sm9RXKb3hpHe3MfEZyjb', title : "카프리썬 오렌지(200ml*10)", price : 6050, discountRate : 15, thumbnailImage : "/images/product/카프리썬오렌지.png" },
    { productId : 'sWpLAtpN52bmwkhqiq1S', title : "파워오투 복숭아자몽(500ml*24)", price : 35200, thumbnailImage : "/images/product/파워오투복숭아자몽.png" },
    { productId : 'sCTHoWGOEdROxEuiMb4v', title : "오이오차녹차(525ml*24)", price : 38060, thumbnailImage : "/images/product/오이오차녹차.png" },
  ]
  const loginId = JSON.parse(localStorage.getItem('loginInfo')).loginId;
  const userData = JSON.parse(localStorage.getItem(loginId))
  localStorage.setItem(loginId, JSON.stringify({...userData, wish}))
}
function createWishList(wishList) {
  const fragmentEl = document.createDocumentFragment();
  wishList.forEach((wish) => {
    const { productId, title, price, discountRate = 0, thumbnailImage} = wish;
    // 할인율이 있는 상품은 원가를 계산한 값을 originPrice 변수에 담아 화면에 같이 렌더링
    const costPrice = discountRate ? Math.floor((price * 100) / (100 - discountRate)) : price;

    /* product-list-container > thumbnailImage + product-detail-section */
    const productListContainerEl = makeDOMwithProperties('div', { className : 'product-list-container' })
    const thumbnailImageEl = makeDOMwithProperties('img', { alt : '썸네일 이미지', src : thumbnailImage })

    /* product-detail-section > product-text-container + product-button-section */
    const productDetailSectionEl = makeDOMwithProperties('div', { className : 'product-detail-section' });

    /* product-text-container > product-title + product-price */
    const productTextContainerEl = makeDOMwithProperties('div', { className : 'product-text-container' });
    // product-title
    const productTitleEl = makeDOMwithProperties('div', { className : 'product-title' });
    const productLinkEl = makeDOMwithProperties('a', { href : 'javascript:void(0)', className : 'product-name', textContent: title });
    productTitleEl.append(productLinkEl);
    // product-price
    const productPriceEl = makeDOMwithProperties('div', { className : 'product-price' });
    const productDiscountPriceEl = makeDOMwithProperties('div', { className : 'product-discount-price', textContent: `${price.toLocaleString('ko-KR')}원`});
    const productCostPriceEl = makeDOMwithProperties('div', { className : 'product-cost-price', textContent: ''});
    productCostPriceEl.textContent = discountRate ? `${costPrice.toLocaleString('ko-KR')}원` : '';
    productPriceEl.append(productDiscountPriceEl, productCostPriceEl);

    /* product-button-section > delete-button + take-button */
    const productButtonSectionEl = makeDOMwithProperties('div', { className : 'product-button-section' });
    productButtonSectionEl.dataset.id = productId;
    // delete-button
    const deleteButtonEl = makeDOMwithProperties('button', { className : 'delete-button', textContent: '삭제' });
    deleteButtonEl.addEventListener('click', function () {
      const productId = this.closest('.product-button-section').dataset.id
      const wishList = getDataFromLocalStorage(WISH);
      const filteredWishList = wishList.filter((wish) => {
        return wish.productId !== productId
      })
      const loginId = JSON.parse(localStorage.getItem('loginInfo')).loginId;
      const userData = JSON.parse(localStorage.getItem(loginId))
      localStorage.setItem(loginId, JSON.stringify({...userData, wish : filteredWishList}))
      initPage();
    })
    // take-button
    const takeButtonEl = makeDOMwithProperties('button', { className : 'take-button', textContent: '담기' });
    takeButtonEl.addEventListener('click', function () {
      const productId = this.closest('.product-button-section').dataset.id
      // 기존 cart 목록
      const cartList = getDataFromLocalStorage(CART) || [];
      // 추가할 wish
      const wishList = getDataFromLocalStorage(WISH);
      const targetWish = wishList.find((wish) => {
        return wish.productId === productId
      })
      // 이미 담겨져 있는 것 제외
      console.log(cartList)
      const isExisting = cartList.find((item) => {
        return item.productId === productId
      })
      if(isExisting) {
        Swal.fire({
          title: '장바구니에 이미 존재하는 상품입니다.',
          text: "장바구니를 확인하러 가볼까요 ?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '장바구니로 이동',
          cancelButtonText: '계속 쇼핑하기'
        }).then((result) => {
          if (result.isConfirmed) {
            //장바구니 이동
          }
        })
        return;
      }
      // 덮어쓰기
      const loginId = JSON.parse(localStorage.getItem('loginInfo')).loginId;
      const userData = JSON.parse(localStorage.getItem(loginId))
      localStorage.setItem(loginId, JSON.stringify({...userData, cart : [...cartList, {...targetWish, quantity : 1}]}))
      //swal
      Swal.fire({
        title: '장바구니에 성공적으로 담겼습니다.',
        text: "장바구니를 확인하러 가볼까요 ?",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '장바구니로 이동',
        cancelButtonText: '계속 쇼핑하기'
      }).then((result) => {
        if (result.isConfirmed) {
          //장바구니 이동
        }
      })

    })
    const takeButtonImageEl = makeDOMwithProperties('img', { alt : '장바구니 담기', src : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNiAzNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTM2IDM2SDBWMGgzNnoiLz4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1LjE2NCA2LjU0NykiIHN0cm9rZT0iIzVmMDA4MCIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjciPgogICAgICAgICAgICA8cGF0aCBkPSJtMjUuNjggMy42Ni0yLjcyIDExLjU3SDcuMzdMNC42NiAzLjY2eiIvPgogICAgICAgICAgICA8Y2lyY2xlIGN4PSIyMC41MiIgY3k9IjIwLjc4IiByPSIyLjE0Ii8+CiAgICAgICAgICAgIDxjaXJjbGUgY3g9IjkuODEiIGN5PSIyMC43OCIgcj0iMi4xNCIvPgogICAgICAgICAgICA8cGF0aCBkPSJNMCAwaDMuOGwxLjc2IDcuNSIvPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==" })
    takeButtonEl.prepend(takeButtonImageEl);

    productTextContainerEl.append(productTitleEl, productPriceEl);
    productButtonSectionEl.append(deleteButtonEl, takeButtonEl)
    productDetailSectionEl.append(productTextContainerEl, productButtonSectionEl)
    productListContainerEl.append(thumbnailImageEl, productDetailSectionEl);
    fragmentEl.append(productListContainerEl);
  })
  return fragmentEl;
  // 하단 렌더링 구조 참고
  /* html */`
    <div class="product-list-container">
      <img alt="" src="https://img-cf.kurly.com/shop/data/goods/1648206780555l0.jpeg" />
      <div class="product-detail-section">
        <div class="product-text-container">
          <div class="product-title">
            <a href="javascript:void(0)" class="product-name">[사미헌] 갈비탕</a>
          </div>
          <div class="product-price">
            <span class="product-discount-price">11,000원</span>
            <span class="product-cost-price">12,000원</span>
          </div>
        </div>
        <div class="product-button-section">
          <button class="delete-button">삭제</button>
          <button class="take-button">
            <img
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNiAzNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTM2IDM2SDBWMGgzNnoiLz4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1LjE2NCA2LjU0NykiIHN0cm9rZT0iIzVmMDA4MCIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjciPgogICAgICAgICAgICA8cGF0aCBkPSJtMjUuNjggMy42Ni0yLjcyIDExLjU3SDcuMzdMNC42NiAzLjY2eiIvPgogICAgICAgICAgICA8Y2lyY2xlIGN4PSIyMC41MiIgY3k9IjIwLjc4IiByPSIyLjE0Ii8+CiAgICAgICAgICAgIDxjaXJjbGUgY3g9IjkuODEiIGN5PSIyMC43OCIgcj0iMi4xNCIvPgogICAgICAgICAgICA8cGF0aCBkPSJNMCAwaDMuOGwxLjc2IDcuNSIvPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg=="
              alt="장바구니 담기" />
            담기
          </button>
        </div>
      </div>
    </div>
  `
}