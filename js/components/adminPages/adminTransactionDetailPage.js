export default /* html */ `
<div class="product-list-wrapper">
  <div class="product-title-wrapper">
    <div class="title-header">
      <div class="title">개별 거래 내역 관리</div>
    </div>
    <div class="button-wrapper">
      <div class="cancel">
         <button class="completed-button"></button>
      </div>
      <div class="completed">
        <button class="completed-button"></button>
      </div>
    </div>
  </div>
  <div class="bar"></div>
  <div class="product-info skeleton-loading">
    <div class="product-info-left">
      <div class="product-thumbnail">
      </div>
      <div class="product-info-title">상품정보</div>
      <div class="product-id"></div>
      <div class="product-name"></div>
      <div class="product-price"></div>
    </div>
    <div class="product-info-right">
      <div class="info-customer">
        <div class="info-customer-title">구매자 정보</div>
        <div class="customer-email"></div>
        <div class="customer-name"></div>
      </div>
      <div class="info-account">
        <div class="account-title">계좌 정보</div>
        <div class="customer-account"></div>
        <div class="customer-bankcode"></div>
        <div class="customer-accountnum"></div>
      </div>
      <div class="info-transaction">
        <div class="transaction-title">거래 정보</div>
        <div class="transaction-time"></div>
        <div class="transaction-calcel"></div>
        <div class="transaction-confirm"></div>
      </div>
    </div>
  </div>
</div>`;
