export default /* html */ `
  <div class="inner-wrapper order-sheet-wrapper">
    <h2>주문서</h2>

    <div class="order-category">
      <h3>주문 상품</h3>
      <button>
        <!-- js로 rotateX, alt 조절 -->
        <img class="button-icon" id="toggleOrderList"
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBpZD0iN2EwMnFxZzNqYSIgZD0iTTExIDEyaDl2OSIvPgogICAgPC9kZWZzPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBkPSJNMCAwaDMwdjMwSDB6Ii8+CiAgICAgICAgPHVzZSBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgdHJhbnNmb3JtPSJyb3RhdGUoLTQ1IDE1LjUgMTYuNSkiIHhsaW5rOmhyZWY9IiM3YTAycXFnM2phIi8+CiAgICA8L2c+Cjwvc3ZnPgo="
          alt="펼치기">
      </button>
    </div>

    <div class="order-list-area">
      <div class="summary">
        <span></span>
        상품을 주문합니다.
      </div>
      <ul class="list">
        <!-- <li class="item">
          <img class="thumbnail" src=thumbnailImage></img>
          <span class="title-wrapper">
            <span class="title">title</span>
          </span>
          <div class="quantity-wrapper">
            <span class="quantity">quantity개</span>
          </div>
          <span class="price-wrapper">
            <span class="discount-price">price</span>
            <span class="cost-price">10,000원</span>
          </span>
        </li> -->
      </ul>
    </div>

    <div class="order-category">
      <h3>주문자 정보</h3>
    </div>
    <div class="orderer-area">
      <div class="info">
        <span class="info-title">보내는 분</span>
        <div class="content-wrapper">
          <span class="content sender"></span>
        </div>
      </div>
      <div class="info">
        <span class="info-title">이메일</span>
        <div class="content-wrapper">
          <span class="content email"></span>
          <div class="additional-info">
            <p>이메일을 통해 주문처리과정을 보내드립니다.</p>
            <p>정보 변경은 마이페이지 > 개인정보 수정 메뉴에서 가능합니다.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="order-category">
      <h3>배송 정보</h3>
      <div class="delivery-info-tab">
        <button class="delivery-notice">배송지 변경 안내</button>
        <div class="delivery-notice-message">
          <p>개인정보 수정에서<br />배송지를 변경할 수 있어요</p>
          <button class="close-message-button"></button>
        </div>
      </div>
    </div>

    <div class="delivery-area">
      <div class="destination-wrapper">
        <span class="info-title">배송지</span>
        <div class="content">
          <span class="badge">기본배송지</span>
          <p class="destination"></p>
        </div>
      </div>
    </div>

    <div class="area-wrapper">
      <div class="area-left">
        <div class="order-category">
          <h3>쿠폰 / 적립금</h3>
        </div>
        <div class="coupon-area">
          <span class="info-title">쿠폰 적용</span>
          <div class="coupon-selector-wrapper" id="toggleCouponList">
            <button class="coupon-selector">
              <span></span>
              <i class="bi bi-caret-down-fill"></i>
            </button>
            <ul class="coupon-list">
              <!-- <li class="coupon">
                <span>10% 할인 쿠폰</span>
              </li>
              <li class="coupon">
                <span>20% 할인 쿠폰</span>
              </li>
              <li class="coupon">
                <span>30% 할인 쿠폰</span>
              </li>
              <li class="coupon">
                <span>40% 할인 쿠폰</span>
              </li>
              <li class="coupon">
                <span>50% 할인 쿠폰</span>
              </li> -->
            </ul>
          </div>
        </div>
        <div class="accumulated-cash-area">
          <span class="info-title">적립금 적용</span>
          <div class="wrapper">
            <div>
              <div class="accumulated-cash">0</div>
              <button>모두사용</button>
            </div>
          </div>
        </div>
        <div class="order-category">
          <h3>결제 수단</h3>
        </div>
        <div class="payment-area">
          <div class="info-title">결제 수단 선택</div>
          <div class="content">
            <div class="payment">계좌 간편 결제</div>
            <div class="no-list">
              <p>등록된 계좌가 없습니다.</p>
              <a href="/mypage/account" data-navigo>
                <span>계좌 등록하러 가기</span>
              </a>
            </div>
            <!-- Slider main container -->
            <div class="swiper account-list d-none">
              <div class="swiper-wrapper">
                <!-- Slides -->
                <!-- <div class="swiper-slide">
                  <div class="account-info">
                    <h4 id="bankName">NH농협은행</h4>
                    <p id="accountNumber">123-XXXX-XXXX-XX</p>
                    <span id="balance">3,000,000</span>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="account-info">
                    <h4 id="bankName">하나은행</h4>
                    <p id="accountNumber">123-XXXX-XXXX-XX</p>
                    <span id="balance">3,000,000</span>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="account-info">
                    <h4 id="bankName">카카오뱅크</h4>
                    <p id="accountNumber">123-XXXX-XXXX-XX</p>
                    <span id="balance">3,000,000</span>
                  </div>
                </div> -->
              </div>
              <div class="swiper-pagination"></div>

              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="area-right">
        <div class="area-amount sticky">
          <div class="wrapper">
            <h3>결제 금액</h3>
          </div>
          <ul class="list">
            <li>
              <div class="title">주문금액</div>
              <div class="amount-wrapper">
                <span id="orderAmount"></span>
                <span>원</span>
              </div>
            </li>
            <li>
              <div class="title">상품금액</div>
              <div class="amount-wrapper">
                <span id="originAmount"></span>
                <span>원</span>
              </div>
            </li>
            <li>
              <div class="title">상품할인금액</div>
              <div class="amount-wrapper">
                <span id="saledAmount"></span>
                <span>원</span>
              </div>
            </li>
            <li>
              <div class="title">배송비</div>
              <div class="amount-wrapper">
                <span id="deliveryAmount">0</span>
                <span>원</span>
              </div>
            </li>
            <li>
              <div class="title">쿠폰할인</div>
              <div class="amount-wrapper">
                <span id="couponAmount">0</span>
                <span>원</span>
              </div>
            </li>
            <li>
              <div class="title">적립금사용</div>
              <div class="amount-wrapper">
                <span id="savedAmount">0</span>
                <span>원</span>
              </div>
            </li>
            <li class="total">
              <div class="title">최종결제금액</div>
              <div class="amount-wrapper">
                <span id="totalAmount"></span>
                <span>원</span>
              </div>
            </li>
            <li>
              <div class="info">
                <span class="badge">적립</span>
                구매 시 50원(0.1%)
              </div>
            </li>
          </ul>
          <div>
          </div>
        </div>
      </div>
    </div>

    <div class="pay-button-area">
      <button type="button" width="240" height="56" radius="3">
        <span>
          <span id="totalAmountInButton"></span>원 결제하기
        </span>
        <div class="spinner-wrapper">
          <div class="spinner"></div>
        </div>
      </button>
    </div>
  </div>
`;
