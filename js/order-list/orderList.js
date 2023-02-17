import { checkAuthorization } from '../api/checkAuthorization.js'
import { getOrderList } from './orderListApi.js'

/* COMMON */
const $ = selector => document.querySelector(selector);

/* GLOBAL LOGIC */
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
  if(orderList.length === 0) {
    const noListEl = $('.no-list');
    noListEl.classList.remove('d-none');
    return;
  }

  const noListEl = $('.no-list');
  noListEl.classList.add('d-none');

  // 분 단위로 그룹핑
  const groupedList = orderList.reduce((acc, cur) => {
    // console.log(cur);
    const utcIsoString = cur.timePaid;
    const utcDate = new Date(utcIsoString);
    const kstDate = new Date(utcDate.getTime() + (9 * 60 * 60 * 1000));
    const year = kstDate.getFullYear();
    const month = kstDate.getMonth() + 1;
    const date = kstDate.getDate();
    const hour = kstDate.getHours();
    const minute = kstDate.getMinutes();
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

    acc[formattedDate] ? acc[formattedDate].push(cur.product) : acc[formattedDate] = [cur.product];
    return acc;
  }, {})

  const timeDescendingOrder = Object.entries(groupedList).sort((a, b) => {
    return new Date(b[0]).getTime() - new Date(a[0]).getTime()
  })
  // console.log(timeDescendingOrder)
  const timeDescendingOrderArr = timeDescendingOrder.reduce((acc, order) => {
    acc.push({[order[0]] : order[1]})
    return acc;
  }, [])
  // console.log(timeDescendingOrderArr)
  
  // 그룹핑된 결제 단위 안에서 수량을 다시 체크하는 로직(중복이 제거된 배열과 함께 수량까지 체크되어야함.)
  // [{time : [{...}, {...}}]}, {...}, {...}]
  timeDescendingOrderArr.forEach((order, index) => {
    for(let time in order) {
      const deduplicated = order[time].reduce((acc, product) => {
        const { productId } = product;
        acc[productId] ? acc[productId].quantity += 1 : acc[productId] = {...product, quantity : 1}
        return acc;
      }, {})
      const productsArr = Object.values(deduplicated);

      // 총 상품 금액 구하기
      const price = productsArr.reduce((acc, product) => {
        acc += product.price * product.quantity;
        return acc;
      }, 0)
      
      // id 만들기
      const date = new Date(time);
      const numericString = `${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2,'0')}${date.getDate().toString().padStart(2,'0')}${date.getHours().toString().padStart(2,'0')}${date.getMinutes().toString().padStart(2,'0')}`;

      
      // 외부 Summary 요소 Create !
      const orderListEl = $('.order-list');
      const templateEl = document.createElement('template');

      templateEl.innerHTML += /* html */`
      <div class="list-group" id=${numericString}>
        <div class="list-title">
          <div class="title-info">
            <span class="transaction-date">${time} 결제</span>
            <label for=${index} class="transaction-name">${productsArr[0].title} 포함 총 ${productsArr.length}건</label>
            <span class="transaction-price">${price.toLocaleString('ko-KR')}원</span>
          </div>
          <!-- <div class="title-btn-wrapper">
            <button></button>
            <button></button>
          </div> -->
        </div>
        <input type="checkbox" id=${index}>
        <ul>
          
        </ul>
      </div>
      `
      orderListEl.append(templateEl.content);
  
      // 내부 리스트 요소 Create !
      const groupEl = document.getElementById(numericString);
      const ulEl = groupEl.children[2];
      const templateEl2 = document.createElement('template');
      productsArr.forEach((product) => {
        templateEl2.innerHTML += /* html */`
        <li class="item">
          <div class="order-area">
            <div class="info">
              <img class="thumbnail" src=${product.thumbnail} alt="감자깡" height="60px" />
              <div class="info-list">
                <dl>
                  <dt>상품명</dt>
                  <dd id="name">${product.title}</dd>
                </dl>
                <dl>
                  <dt>결제방법</dt>
                  <dd>계좌 이체</dd>
                </dl>
                <dl>
                  <dt>수량</dt>
                  <dd id="quantity">${product.quantity}개</dd>
                </dl>
                <dl>
                  <dt>결제금액</dt>
                  <dd id="transactionPrice">${(product.price * product.quantity).toLocaleString('ko-KR')}원</dd>
                </dl>
              </div>
            </div>
            <div class="side-info">
              <span>배송중</span>
              <div>
                <button type="button" height="36" radius="3">
                  <span>1:1 문의</span>
                </button>
              </div>
            </div>
          </div>
        </li>
        `
      })
      ulEl.append(templateEl2.content);
    }
  })
  const skeletonLoadingEl = $('.skeleton-loading');
  skeletonLoadingEl.classList.add('d-none');
}
