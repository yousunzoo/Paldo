export default /* html */ `
      <div class="product-list-wrapper">
      <div class="title-header">
        <div class="title">거래 내역 관리</div>
          <div class="search-product">
            <input type="text" class="search-username" placeholder="구매자명을 입력해 주세요." />
            <div class="search-button-wrapper">
              <button class="search">검색</button>
            </div>
            <input type="text" id="myDatepicker" placeholder="거래날짜를 선택해주세요.">
          </div>
        </div>
        <div class="item-tag">
          <div class="info item-no">NO</div>
          <div class="info item-name">상품명</div>
          <div class="info item-price">가격</div>
          <div class="info item-coustmer">구매자</div>
          <div class="info item-bank">거래은행</div>
          <div class="info item-time">거래일시</div>
          <div class="info item-calcel">취소여부</div>
          <div class="info item-confirm">완료여부</div>
        </div>
        <ul class="transaction-list">

        </ul>
        <div class="pagination-transaction"></div>
      </div>`;
