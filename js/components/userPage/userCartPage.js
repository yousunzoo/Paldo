export default /* html */ `
 <div class="inner-wrapper cart-wrapper">
          <h2 class="main-title">장바구니</h2>
          <div class="cart-section">
            <div class="cart-list">
              <div class="cart-list-tab">
                <label for="check-all" class="check-all-area">
                  <input type="checkbox" id="check-all" />
                  <div class="checkbox-icon"></div>
                  <span>전체선택</span>
                </label>

                <button class="delete-button">선택삭제</button>
              </div>
              <div class="cart-list-area">
                <ul class="product-list">
                  <li class="skeleton-li">
                    <div class="skeleton-check skeleton"></div>
                    <div class="skeleton-img skeleton"></div>
                    <div class="skeleton-text skeleton"></div>
                    <div class="skeleton-button skeleton"></div>
                    <div class="skeleton-text skeleton"></div>
                    <div class="skeleton-button skeleton"></div>
                  </li>
                  <li class="skeleton-li">
                    <div class="skeleton-check skeleton"></div>
                    <div class="skeleton-img skeleton"></div>
                    <div class="skeleton-text skeleton"></div>
                    <div class="skeleton-button skeleton"></div>
                    <div class="skeleton-text skeleton"></div>
                    <div class="skeleton-button skeleton"></div>
                  </li>
                  <li class="skeleton-li">
                    <div class="skeleton-check skeleton"></div>
                    <div class="skeleton-img skeleton"></div>
                    <div class="skeleton-text skeleton"></div>
                    <div class="skeleton-button skeleton"></div>
                    <div class="skeleton-text skeleton"></div>
                    <div class="skeleton-button skeleton"></div>
                  </li><li class="skeleton-li">
                    <div class="skeleton-check skeleton"></div>
                    <div class="skeleton-img skeleton"></div>
                    <div class="skeleton-text skeleton"></div>
                    <div class="skeleton-button skeleton"></div>
                    <div class="skeleton-text skeleton"></div>
                    <div class="skeleton-button skeleton"></div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="cart-total-area">
              <div class="cart-total">
                <div class="cart-bills-top"></div>
                <div class="cart-bills-main">
                  <div class="cart-bills-line">
                    <span class="price-text">상품 금액</span>
                    <span class="origin-price"><span>0</span> 원</span>
                  </div>
                  <div class="cart-bills-line">
                    <span class="price-text">상품 할인 금액</span>
                    <span class="discount-price">- <span>0</span> 원</span>
                  </div>
                  <div class="cart-bills-line">
                    <span class="price-text">배송비</span>
                    <span class="delivery-price"><span>0</span> 원</span>
                  </div>
                  <div class="cart-bills-line">
                    <span class="price-text">결제 예정 금액</span>
                    <span class="total-price"><span>0</span> 원</span>
                  </div>
                </div>
                <div class="payment-area">
                  <button class="payment-button" disabled>
                    <span class="push-button-txt">상품을 선택해주세요</span>
                  </button>
                  <ul class="description">
                    <li class="description-option">
                      [주문완료] 상태일 경우에만 주문 취소 가능합니다.
                    </li>
                    <li class="description-option">
                      [마이페이지 > 주문내역 상세페이지] 에서 직접 취소하실 수
                      있습니다.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
