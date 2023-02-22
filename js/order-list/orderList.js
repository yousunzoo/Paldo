import { checkAuthorization } from '../api/checkAuthorization.js'
import { getOrderList, cancelTransaction, confirmTransaction } from './orderListApi.js'
import { makeDOMwithProperties } from '../utils/dom.js'

/* GLOBAL LOGIC */
const skeletonLoadingEl = document.querySelector('.skeleton-loading');

// flatPickr
flatpickr("#myDatepicker", {
  dateFormat: "Y-m-d", // set the date format
  disableMobile: true, // disable mobile optimizations
});
const pickerEl = document.querySelector(".flatpickr-input");
pickerEl.addEventListener("change", () => {
  skeletonLoadingEl.classList.add('d-none');
  initPage();
  skeletonLoadingEl.classList.remove('d-none');
});

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

/* FUNCTIONS */
async function initPage() {
  const contentEl = document.querySelector('.order-list > .content');

  // 사용자 전체 거래내역 조회
  const orderListData = await getOrderList();
  const data = pickerEl.value ? filterByFlatPickr(orderListData) : orderListData

  // 거래 내역이 없을 때
  if(data.length === 0) {
    contentEl.innerHTML = /* html */`
      <p class='no-list'>주문내역이 없습니다.</p>
    `
    skeletonLoadingEl.classList.add('d-none');
    return;
  }
  // 거래 내역이 있을 때
  contentEl.innerHTML = '';
  
  const manipulatedData = manipulateOrderListData(data);

  // ul 요소 생성
  const orderListUls = createOrderListUls(manipulatedData);

  // 렌더링
  contentEl.append(...orderListUls);
  skeletonLoadingEl.classList.add('d-none');
}
function manipulateOrderListData(orderListData) {
  // 날짜별 그룹핑
  const groupedObj = groupByMinutes(orderListData);

  // 내림차순 정렬
  let sortedList = Object.entries(groupedObj).sort((a, b) => {
    return new Date(b[0]).getTime() - new Date(a[0]).getTime();
  })

  //중복 제거 및 수량 체크
  deduplicateAndCheckQuantity(sortedList);
  return sortedList;
}
function groupByMinutes(list) {
  return list.reduce((acc, order) => {
    const { timePaid, detailId, done, isCanceled, product } = order;
    const newFormattedProduct = {...product, detailId, done, isCanceled}
    // 날짜 단위 변환
    const formattedDate = changeDateFormatToKR(timePaid);
    // 거래 시간으로 그룹핑
    acc[formattedDate] ? acc[formattedDate].push(newFormattedProduct) : acc[formattedDate] = [newFormattedProduct];
    return acc;
  }, {})
}
function changeDateFormatToKR(time) {
  const kstDate = new Date(time);
  const year = kstDate.getFullYear();
  const month = kstDate.getMonth() + 1;
  const date = kstDate.getDate();
  const hour = kstDate.getHours();
  const minute = kstDate.getMinutes();
  return `${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}
function deduplicateAndCheckQuantity(list) {
  list.forEach((item) => {
    const duplicatedOrders = item[1];
    const duplicatedOrdersObj = duplicatedOrders.reduce((acc, order) => {
      const { productId } = order;
      acc[productId] ? acc[productId].quantity += 1 : acc[productId] = {...order, quantity : 1}
      return acc;
    }, {})
    item.splice(1, 1, Object.values(duplicatedOrdersObj))
  })
}
function createOrderListUls(list) {
  return list.map((list, index) => {
    const [ time , products ] = list;
    // 총 상품 금액
    const price = products.reduce((acc, product) => {
      const { price, quantity } = product;
      acc += price * quantity;
      return acc;
    }, 0)
    const orderListUl = makeDOMwithProperties('div', { className : 'list-group' })
    orderListUl.innerHTML = /* html */`
      <div class='list-title' id=${index}>
        <div class='title-info'>
          <span class='transaction-date'>${time} 결제</span>
          <span class='transaction-name'>${products[0].title} 포함 총 ${products.length}건</span>
          <span class='transaction-price'>${price.toLocaleString('ko-KR')}원</span>
        </div>
        <div class="spinner"></div>
      </div>
      <ul>
        
      </ul>
    `
    const orderListLi = orderListUl.querySelector('.list-title')
    orderListLi.addEventListener('click', () => {
      // 스피너 로딩
      const spinnerEl = orderListUl.querySelector('.spinner');
      spinnerEl.classList.add('active');

      // 내부에 요소가 없으면
      const ulEl = orderListLi.parentElement.querySelector('ul')
      if(!ulEl.children.length) {
        // li 요소 렌더링
        const orderListLiEls = createOrderListLis(products)
        ulEl.append(...orderListLiEls);
      }
      // 있으면 토글링만
      ulEl.style.display = ulEl.style.display === 'block' ? 'none' : 'block';
      spinnerEl.classList.remove('active');
    })
    return orderListUl
  })
}
function createOrderListLis(products) {
  return products.map((product) => {
    const { isCanceled, done } = product;
    const liEl = makeDOMwithProperties('li', { className : 'item' });
    liEl.innerHTML = /* html */`
      <div class='order-area'>
        <div class='info'>
          <img class='thumbnail' src=${product.thumbnail} alt='감자깡' height='60px' />
          <div class='info-list'>
            <dl>
              <dt>상품명</dt>
              <dd id='name'>${product.title}</dd>
            </dl>
            <dl>
              <dt>결제방법</dt>
              <dd>계좌 이체</dd>
            </dl>
            <dl>
              <dt>수량</dt>
              <dd id='quantity'>${product.quantity}개</dd>
            </dl>
            <dl>
              <dt>결제금액</dt>
              <dd id='transactionPrice'>${(product.price * product.quantity).toLocaleString('ko-KR')}원</dd>
            </dl>
          </div>
        </div>
        <div class='side-info'>
          <span>상품 준비중</span>
          <div class='buttons' data-id=${product.detailId}>
            <button class='order-cancel-button ${done ? 'inactive' : ''}' ${done ? 'disabled' : ''}>주문 취소</button>
            <button class='order-confirm-button ${done}' ${done ? 'disabled' : ''}>거래 확정</button>
          </div>
        </div>
      </div>
      <div class="cancelled ${isCanceled}"><span>주문이 취소된 상품입니다.</span></div>
    `
    // 주문 취소 이벤트 핸들러 할당
    const orderCancelBtnEl = liEl.querySelector('.order-cancel-button');
    orderCancelBtnEl.addEventListener('click', onClickCancelBtn)
  
    // 거래 확정 이벤트 핸들러 할당
    const orderConfirmBtnEl = liEl.querySelector('.order-confirm-button');
    orderConfirmBtnEl.addEventListener('click', onClickConfirmBtn)
    return liEl;
  })
}
function onClickCancelBtn(event) {
  const liEl = event.currentTarget.closest('.item');
  const buttonsEl = liEl.querySelector('.buttons');
  Swal.fire({
    title: '정말로 취소하겠습니까 ?',
    text: "취소된 주문 건은 다시 되돌릴 수 없습니다.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '확인',
    cancelButtonText: '취소'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const body = { detailId : buttonsEl.dataset.id }
        // 주문 취소 요청 API 전송
        const res = await cancelTransaction(body);
        if(res) {
          // 삭제 요청 성공 시
          Swal.fire(
            '취소 성공!',
            '주문이 성공적으로 취소되었습니다.',
            'success'
          )
          // 주문 취소 관련 렌더링
          const cancelledEl = liEl.querySelector('.cancelled');
          cancelledEl.classList.remove('false');
          cancelledEl.classList.add('true');
        } else {
          throw new Error('알 수 없는 오류가 발생했습니다.')
        }
      } catch(err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
        console.error(err);
        return;
      }
    }
  })
}
function onClickConfirmBtn(event) {
  const liEl = event.currentTarget.closest('.item');
  const buttonsEl = liEl.querySelector('.buttons');
  Swal.fire({
    title: '거래 확정하겠습니까 ?',
    text: "거래 확정 후엔 주문 취소가 불가능합니다.",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '확인',
    cancelButtonText: '취소'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const body = { detailId : buttonsEl.dataset.id }
        // 거래 확정 요청 API 전송
        const res = await confirmTransaction(body);
        if(res) {
          // 거래 확정 요청 성공 시
          Swal.fire(
            '구매 확정 성공!',
            '성공적으로 구매 확정되었습니다.',
            'success'
          )
          // 거래 확정 관련 렌더링
          const orderConfirmBtnEl = liEl.querySelector('.order-confirm-button');
          orderConfirmBtnEl.classList.remove('false');
          orderConfirmBtnEl.classList.add('true');
          orderConfirmBtnEl.disabled = true;
          const orderCancelBtnEl = liEl.querySelector('.order-cancel-button');
          orderCancelBtnEl.classList.add('inactive');
          orderCancelBtnEl.disabled = true;
        } else {
          throw new Error('알 수 없는 오류가 발생했습니다.')
        }
      } catch(err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
        console.error(err);
        return;
      }
    }
  })
}
function filterByFlatPickr(orderListData) {
  return orderListData.filter(order => {
    const kstDate = new Date(order.timePaid);
    const year = kstDate.getFullYear();
    const month = kstDate.getMonth() + 1;
    const date = kstDate.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}` === pickerEl.value
  })
}