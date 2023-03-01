export default /* html */ `
<div class="admin-product-wrapper">
  <div class="title-header">
    <div class="title">상품 등록</div>
  </div>
  <div class="bar"></div>
  <div class="form-wrapper">
    <fieldset>
      <div class="form-item">
        <label for="name">상품명</label>
        <input id="name" type="text" class="product-name" />
      </div>
      <div class="form-item">
        <label for="price">원가격</label>
        <input id="price" type="number" class="product-price" />
        <div class="price-desc">원</div>
      </div>
      <div class="form-item">
        <label for="sale">할인율</label>
        <input id="sale" type="text" class="product-sale" />
        <div class="sale-desc">%</div>
        <div class="sale-cost-title">판매가</div>
        <input class="sale-cost" disabled></input>
        <div class="price-desc">원</div>
        <div class="desc">판매가는 할인이 적용된 가격입니다.</div>
      </div>
      <div class="form-item">
        <label for="tag">태그</label>
        <input id="tag" type="text" class="product-tag" /><span>, 쉼표로 구분하여 작성해주세요.</span>
      </div>
      <div class="form-item last-item">
          <div class="thumbnail-wrapper">
            <label for="thumbnail-title">썸네일 등록</label>
            <div class="thumbnail-info-wrapper">
              <input id="thumbnail" type="file" class="product-thumbnail" />
              <img class="thumbnail-img thumbnail" src="${require("../../../static/images/no-img.jpg")}" />
            </div>
          </div>
          <div class="right-bar"></div>
          <div class="detail-wrapper">
            <label for="detail">상세이미지 등록</label>
            <div class="thumbnail-info-wrapper">
              <input id="detail" type="file" class="product-detail" />
              <img class="thumbnail-img detail" src="${require("../../../static/images/no-img.jpg")}"" />
            </div>
          </div>
        </div>
    </fieldset>
  </div>
  <div class="button-wrapper">
    <button href="product" data-navigo>이전</button>
    <button class="res-button" data-navigo>등록</button>
  </div>
</div>
`;
