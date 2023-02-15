export default /* html */ `
<div class="goods-wrapper">
  <div class="title-header">
    <div class="title">상품 등록</div>
  </div>
  <div class="bar"></div>
  <div class="form-wrapper">
    <fieldset>
      <div class="form-item">
        <label for="name">상품명</label>
        <input id="name" type="text" class="goods-name" />
      </div>
      <div class="form-item">
        <label for="price">판매가</label>
        <input id="price" type="number" class="goods-price" />
        <div class="price-desc">원</div>
      </div>
      <div class="form-item">
        <label for="sale">할인율</label>
        <input id="sale" type="number" class="goods-sale" />
        <div class="sale-desc">%</div>
        <span>할인율은 1% ~ 100% 입력 가능합니다.</span>
      </div>
      <div class="form-item">
        <label for="tag">태그</label>
        <input id="tag" type="text" class="goods-tag" /><span>, 쉼표로 구분하여 작성해주세요.</span>
      </div>
      <div class="form-item">
        <label for="thumbnail">썸네일 등록</label>
        <input id="thumbnail" type="file" class="goods-thumbnail" />
      </div>
      <div class="form-item">
        <label for="detail">상세이미지 등록</label>
        <input id="detail" type="file" class="goods-detail" />
      </div>
    </fieldset>
  </div>
  <div class="button-wrapper">
    <button href="product" data-navigo>이전</button>
    <button class="res-button" data-navigo>등록</button>
  </div>
</div>
`;
