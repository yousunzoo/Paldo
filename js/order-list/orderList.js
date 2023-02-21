import { checkAuthorization } from '../api/checkAuthorization.js'
import { getOrderList } from './orderListApi.js'

/* GLOBAL LOGIC */
let renderList;
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
  // 사용자 전체 거래내역 조회
  const orderList = await getOrderList();
  const contentEl = document.querySelector('.order-list > .content');
  const skeletonLoadingEl = document.querySelector('.skeleton-loading');

  // 거래 내역이 없을 때
  if(orderList.length === 0) {
    contentEl.innerHTML = /* html */`
      <p class='no-list'>주문내역이 없습니다.</p>
    `
    skeletonLoadingEl.classList.add('d-none');
    return;
  }
  // 거래 내역이 있을 때
  contentEl.innerHTML = '';
  
  // 그룹핑
  const groupedObj = groupByMinutes(orderList);
  console.log(groupedObj)

  // 내림차순 정렬
  let sortedList = Object.entries(groupedObj).sort((a, b) => {
    return new Date(b[0]).getTime() - new Date(a[0]).getTime();
  })

  //중복 제거 및 수량 체크
  deduplicateAndCheckQuantity(sortedList);
  // 외부 변수에 상태 저장
  renderList = sortedList;

  // 요소 생성
  const mappingList = sortedList.map((list, index) => {
    return createGroupEl(list, index)
  })
  const templateEl = document.createElement('template');
  mappingList.forEach((list) => {
    templateEl.innerHTML += list;
  })
  // 렌더링
  contentEl.append(templateEl.content);
  skeletonLoadingEl.classList.add('d-none');
  // 이벤트 할당
  const groupEls = document.querySelectorAll('.list-title');
  groupEls.forEach((groupEl) => {
    groupEl.addEventListener('click', (event) => {
      // 내부에 요소가 없으면 ?
      const ulEl = groupEl.parentElement.querySelector('ul')
      if(!ulEl.children.length) {
        const templateEl = document.createElement('template');
        const mappingList = createDetailEl(event.currentTarget, renderList);
        mappingList.forEach((list) => {
          templateEl.innerHTML += list;
        })
        ulEl.append(templateEl.content);
      }
      // 있으면 토글링만 !
      ulEl.style.display = ulEl.style.display === 'block' ? 'none' : 'block';
    })
  })
  console.log(renderList);
}
function changeDateFormatToKR(time) {
  const utcDate = new Date(time);
  const kstDate = new Date(utcDate.getTime() + (9 * 60 * 60 * 1000));
  const year = kstDate.getFullYear();
  const month = kstDate.getMonth() + 1;
  const date = kstDate.getDate();
  const hour = kstDate.getHours();
  const minute = kstDate.getMinutes();
  return `${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}
function groupByMinutes(list) {
  return list.reduce((acc, order) => {
    const { timePaid, product } = order;
    // 날짜 단위 변환
    const formattedDate = changeDateFormatToKR(timePaid);
    // 거래 시간으로 그룹핑
    acc[formattedDate] ? acc[formattedDate].push(product) : acc[formattedDate] = [product];
    return acc;
  }, {})
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
function createGroupEl(list, index) {
  const [ time , products ] = list;
  // 총 상품 금액
  const price = products.reduce((acc, product) => {
    const { price, quantity } = product;
    acc += price * quantity;
    return acc;
  }, 0)
  
  return /* html */`
  <div class='list-group'>
    <div class='list-title' id=${index}>
      <div class='title-info'>
        <span class='transaction-date'>${time} 결제</span>
        <span class='transaction-name'>${products[0].title} 포함 총 ${products.length}건</span>
        <span class='transaction-price'>${price.toLocaleString('ko-KR')}원</span>
      </div>
    </div>
    <ul>
      
    </ul>
  </div>
  `
}
function createDetailEl(targetGroup, list) {
  console.log(list);
  const { id } = targetGroup; 
  const products = list[id][1];
  console.log(products)

  return products.map((product) => {
    return /* html */`
    <li class='item'>
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
          <span>배송중</span>
          <div class='buttons'>
            <button type='button' height='36' radius='3'>주문 취소</button>
            <button type='button' height='36' radius='3'>거래 확정</button>
          </div>
        </div>
      </div>
    </li>
    `
  })
}