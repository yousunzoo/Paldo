export default /* HTML*/ `
  <div class="goods-wrapper">
    <div class="title-wrapper">
      <div class="title-header">
        <div class="title">상품 수정</div>
      </div>
      <div class="res-button">
        <a href="">수정</a>
      </div>
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
          <input id="price" type="text" class="goods-price" />
          <div class="price-desc">원</div>
        </div>
        <div class="form-item">
          <label for="sale">할인율</label>
          <input id="sale" type="text" class="goods-sale" />
          <div class="sale-desc">%</div>
          <div class="sale-reflection">000</div>
        </div>
        <div class="form-item">
          <label for="description">제품상세설명</label>
          <input id="description" type="text" class="goods-description" />
        </div>
        <div class="form-item">
          <label for="tag">태그</label>
          <input id="tag" type="text" class="goods-tag" />
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
  </div>
`;
