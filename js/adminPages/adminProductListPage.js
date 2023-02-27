export default /* html */ `<div class="goods-list-wrapper">
<div class="title-header">
  <div class="title">상품 관리</div>
  <div class="search-wrapper">
    <div class="category-wrapper">
      <button class="button-category">카테고리</button>
      <ul class="search-category">
        <ul class="category-list">
          <li class="list-tag">스낵</li>
          <li class="list-tag">라면</li>
          <li class="list-tag">음료</li>
          <li class="list-tag">초콜릿/캔디류</li>
          <li class="list-tag">인기</li>
          <li class="list-tag">신상</li>
          <li class="list-tag">세일</li>
        </ul>
      </ul>
    </div>
    <div class="category-wrapper">
      <button class="button-soldout">품절여부</button>
      <ul class="search-soldout">
        <ul class="soldout-list">
          <li class="list-tag">YES</li>
          <li class="list-tag">NO</li>
        </ul>
      </ul>
    </div>
    <input type="text" class="search-goodsname" placeholder="상품명을 입력해 주세요." />
    <div class="search-button-wrapper">
      <button class="search">검색</button>
    </div>
  </div>
</div>

<div class="item-tag-product">
  <div class="info all-check">
    <input type="checkbox" />
  </div>
  <div class="info item-no">NO</div>
  <div class="info item-number">상품ID</div>
  <div class="info item-thumbnail">썸네일</div>
  <div class="info item-name">상품명</div>
  <div class="info item-category">카테고리</div>
  <div class="info item-price">가격</div>
  <div class="info item-sale">할인율</div>
  <div class="info item-outstock">품절여부</div>
</div>
<ul class="goods-list"></ul>
<div class="pagination"></div>
<div class="button-wrapper">
  <button class="delete-button button">삭제</button>
  <a href="registration" class="registration-button button" data-navigo>등록</a>
</div>
</div>
`;
