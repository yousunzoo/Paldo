export default /* html */ `
<div class="product-chart">
  <div class="bar-chart-wrapper">
    <div class="title">제품 수량 통계</div>
    <canvas id="bar-chart" width="650px" height="300px"></canvas>
  </div>
  <div class="pie-chart-wrapper">
    <div class="title">판매 통계</div>
    <canvas id="pie-chart" width="300px" height="300px"></canvas>
  </div>
</div>
<div class="product-inner">
  <div class="store-title">스토어 현황</div>
  <ul class="store-status">
    <li class="status-item status-orders">
      <div class="status-img"></div>
      <div class="title">주문 수</div>
      <div class="order-score score"></div>
    </li>
    <li class="status-item status-withdraw">
      <div class="status-img"></div>
      <div class="title">주문 취소</div>
      <div class="withdraw-score score"></div>
    </li>
    <li class="status-item status-confirmation">
      <div class="status-img"></div>
      <div class="title">구매 확정</div>
      <div class="confirmation-score score"></div>
    </li>
    <li class="status-item status-sales">
      <div class="status-img"></div>
      <div class="title">총 매출</div>
      <div class="sales-score score"></div>
    </li>
    <li class="status-item status-current">
      <div class="status-img"></div>
      <div class="title">현재 상품</div>
      <div class="current-score score"></div>
    </li>
    <li class="status-item status-soldout">
      <div class="status-img"></div>
      <div class="title">품절 상품</div>
      <div class="soldout-score score"></div>
    </li>
  </ul>
</div>
    `;
