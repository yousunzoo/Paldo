export default /* HTML*/ `
  <div class="goods-wrapper">
    <div class="title-wrapper">
      <div class="title-header">
        <div class="title">상품 수정</div>
      </div>
      <div class="res-button">
        <a class="back-button">이전</a>
        <a class="edit-button">수정</a>
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
          <label for="price">원가격</label>
          <input id="price" type="text" class="goods-price" />
          <div class="price-desc">원</div>
        </div>
        <div class="form-item">
          <label for="sale">할인율</label>
          <input id="sale" type="text" class="goods-sale" />
          <div class="sale-desc">%</div>
          <div class="sale-cost-title">판매가</div>
          <input class="sale-cost"></input>
          <div class="desc">판매가는 할인이 적용된 가격입니다.</div>
        </div>
        <div class="form-item">
          <label for="tag">태그</label>
          <input id="tag" type="text" class="goods-tag" />
        </div>
        <div class="form-item">
          <label for="isSoldOut">품절 여부</label>
          <div class="soldout-toggle" >
		        <div class="radio-button instock">
			        <input id="radio-1" type="radio" name="soldout" value="inStock" checked>
			        <label for="radio-1">재고있음</label>
		        </div>			 
		        <div class="radio-button">
			        <input id="radio-2" type="radio" name="soldout" value="soldout">
			        <label for="radio-2">품절</label>
		        </div>
          </div>
        </div>
        <div class="form-item last-item skeleton-loading">
          <div class="thumbnail-wrapper">
            <label for="thumbnail-title">썸네일 등록</label>
            <div class="thumbnail-info-wrapper">
              <input id="thumbnail" type="file" class="goods-thumbnail" />
              <img class="thumbnail-img thumbnail" require('no-img.jpg') />
            </div>
          </div>
          <div class="right-bar"></div>
          <div class="detail-wrapper">
            <label for="detail">상세이미지 등록</label>
            <div class="thumbnail-info-wrapper">
              <input id="detail" type="file" class="goods-detail" />
              <img class="thumbnail-img detail" require('no-img.jpg') />
          </div>
        </div>
      </fieldset>
    </div>
  </div>
`;
