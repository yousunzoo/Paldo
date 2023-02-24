export const mainPage = /* html */ `
<div class="main-banner">
<div class="swiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <img
        src="${require("../../static/images/main_banner_01.png")}"
        alt="main banner 1" />
    </div>
    <div class="swiper-slide">
      <img
        src="${require("../../static/images/main_banner_02.png")}"
        alt="main banner 2" />
    </div>
    <div class="swiper-slide">
      <img
        src="${require("../../static/images/main_banner_03.png")}"
        alt="main banner 3" />
    </div>
  </div>
  <button class="swiper-button-prev"></button>
  <button class="swiper-button-next"></button>
</div>
</div>
<div class="inner-wrapper">
<section class="prd-list1">
  <h2 class="main-title">이 상품 어때요?</h2>
  <!-- product swiper -->
  <div class="main-product-swiper">
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide skeleton-slide">
          <div class="skeleton-wrapper">
            <div class="skeleton-image"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
          </div>
        </div>
        <div class="swiper-slide skeleton-slide">
          <div class="skeleton-wrapper">
            <div class="skeleton-image"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
          </div>
        </div>
        <div class="swiper-slide skeleton-slide">
          <div class="skeleton-wrapper">
            <div class="skeleton-image"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
          </div>
        </div>
        <div class="swiper-slide skeleton-slide">
          <div class="skeleton-wrapper">
            <div class="skeleton-image"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-buttons">
      <button class="swiper-button-prev"></button>
      <button class="swiper-button-next"></button>
    </div>
  </div>
</section>
<section class="prd-list2">
  <h2 class="main-title">이 상품 어때요?</h2>
  <!-- product swiper -->
  <div class="main-product-swiper">
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide skeleton-slide">
          <div class="skeleton-wrapper">
            <div class="loading-image"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
          </div>
        </div>
        <div class="swiper-slide skeleton-slide">
          <div class="skeleton-wrapper">
            <div class="loading-image"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
          </div>
        </div>
        <div class="swiper-slide skeleton-slide">
          <div class="skeleton-wrapper">
            <div class="loading-image"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
          </div>
        </div>
        <div class="swiper-slide skeleton-slide">
          <div class="skeleton-wrapper">
            <div class="loading-image"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-buttons">
      <button class="swiper-button-prev"></button>
      <button class="swiper-button-next"></button>
    </div>
  </div>
</section>
<section class="main-coupon-banner">
  <div class="coupon-banner">
    <a class="banner-more-btn" href="coupon" data-navigo>자세히 보기</a>
  </div>
</section>
<section class="main-recommend">
  <div class="main-recommend-top">
    <div class="recommend-thumbnail">
      <img
        src="${require("../../static/images/recommand_banner.png")}"
        alt="당 충전"
        class="thumbnail" />
    </div>
    <div class="recommend-description">
      <h3 class="description-tit">지금은 당 충전 타임! 🍬</h3>
      <p class="description-text">
        오늘 하루, 일에 치이고 사람에 치여 힘든 당신을 위해 오뚜기에서
        준비한 컬렉션! 언제 어디서든 간편하게 챙겨드세요. 초콜릿부터
        단내 가득한 음료까지 무엇을 좋아하실 지 몰라 이것 저것 다
        준비해봤어요. 그 다음에 무슨 말을 쓰지? 소재 고갈.. 아무튼
        열심히 사는 여러분들 모두모두 화이팅입니다. 많이 많이
        이용해주시고 좋은 피드백 남겨주시면 감사드리겠습니다.
      </p>
    </div>
  </div>
  <div class="main-recommend-bottom">
    <ul class="recommend-list">
      <li class="skeleton-li">
        <div class="skeleton-img skeleton"></div>
        <div class="skeleton-text-wrapper">
          <div class="skeleton-text skeleton"></div>
          <div class="skeleton-text skeleton"></div>
        </div>
        <div class="skeleton-button skeleton"></div>
      </li>
      <li class="skeleton-li">
        <div class="skeleton-img skeleton"></div>
        <div class="skeleton-text-wrapper">
          <div class="skeleton-text skeleton"></div>
          <div class="skeleton-text skeleton"></div>
        </div>
        <div class="skeleton-button skeleton"></div>
      </li>
      <li class="skeleton-li">
        <div class="skeleton-img skeleton"></div>
        <div class="skeleton-text-wrapper">
          <div class="skeleton-text skeleton"></div>
          <div class="skeleton-text skeleton"></div>
        </div>
        <div class="skeleton-button skeleton"></div>
      </li>
      <li class="skeleton-li">
        <div class="skeleton-img skeleton"></div>
        <div class="skeleton-text-wrapper">
          <div class="skeleton-text skeleton"></div>
          <div class="skeleton-text skeleton"></div>
        </div>
        <div class="skeleton-button skeleton"></div>
      </li>
    </ul>
  </div>
</section>
</div>`;

export const loginPage = /* html */ `
<div class="login-inner-wrapper">
        <h2 class="main-title">로그인</h2>
        <form class="login-form" action="POST">
          <fieldset>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="아이디를 입력해주세요"
              required />
            <input
              name="pw"
              id="pw"
              type="password"
              placeholder="패스워드를 입력해주세요"
              required />
            <button class="login-btn">로그인</button>
            <a class="signup-btn" href="/signup" data-navigo>회원가입</a>
          </fieldset>
        </form>
      </div>`;

export const sigupPage = /* html */ `
<div class="inner-wrapper">
<div class="signup-form">
  <h3 class="main_title">회원가입</h3>
  <p class="sub">
    <span id="ico">*</span>
    필수입력사항
  </p>
  <form action="" autocomplete="off">
    <fieldset>
      <div class="signup-section">
        <div class="signup-text">
          <label class="label-id" for="email"
            >이메일<span id="ico">*</span></label
          >
        </div>
        <div class="signup-box">
          <input
            type="text"
            id="email"
            placeholder="이메일을 입력해주세요."
            required />
          <span class="error-message"
            >올바른 이메일 형식을 입력해주세요</span
          >
        </div>
      </div>
      <div class="signup-section">
        <div class="signup-text">
          <label class="label-id" for="password"
            >비밀번호<span id="ico">*</span></label
          >
        </div>
        <div class="signup-box">
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요."
            required />
          <span class="error-message"></span>
        </div>
      </div>
      <div class="signup-section">
        <div class="signup-text">
          <label class="label-id" for="passwordCheck"
            >비밀번호확인<span id="ico">*</span></label
          >
        </div>
        <div class="signup-box">
          <input
            type="password"
            id="passwordCheck"
            placeholder="비밀번호를 다시 입력해주세요."
            required />
          <span class="error-message"
            >비밀번호가 일치하지 않습니다.</span
          >
        </div>
      </div>
      <div class="signup-section">
        <div class="signup-text">
          <label class="label-id" for="userName"
            >이름<span id="ico">*</span></label
          >
        </div>
        <div class="signup-box">
          <input
            type="text"
            id="userName"
            placeholder="이름을 입력해주세요."
            required />
          <span class="error-message"
            >사용자 이름은 20자 이하여야 합니다.</span
          >
        </div>
      </div>
      <div class="signup-section">
        <div class="signup-text">
          <label class="label-id">주소</label>
        </div>
        <div class="signup-box address-box">
          <div class="inline-div">
            <input type="text" id="postcode" placeholder="우편번호" />
            <button class="find-address">우편번호 찾기</button>
          </div>
          <input
            type="text"
            id="roadAddress"
            placeholder="도로명주소" />
          <input
            type="text"
            id="detailAddress"
            placeholder="상세주소" />
        </div>
      </div>
      <div class="signup-section">
        <div class="signup-text">
          <label class="label-id">프로필</label>
        </div>
        <div class="signup-box">
          <input id="userThumbnail" type="file" />
          <span class="error-message"></span>
          <figure class="check-thumbnail"></figure>
        </div>
      </div>
      <button class="signup-button">가입하기</button>
    </fieldset>
  </form>
</div>
</div>`;

export const searchPage = /* html */ `
<div class="inner-wrapper">
          <h3 class="product-page-title"></h3>
          <div class="product-wrapper">
            <div class="product-tab">
              <p class="total-count">총 <span class="count"></span>건</p>
              <ul class="sort-tab">
                <li class="selected"><button>최신순</button></li>
                <li><button>높은 가격순</button></li>
                <li><button>낮은 가격순</button></li>
                <li><button>할인율순</button></li>
              </ul>
            </div>
            <ul class="product-list"></ul>
          </div>
</div>`;

export const couponPage = /* html */ `<div class="inner-wrapper">
<p class="sub-title">식품 쇼핑, 오뚜기몰이랑 함께 해!</p>
<h2 class="coupon-title">오뚜기몰 신규회원 누구나 최대 10만원 할인</h2>
<div class="coupon">
  <img src="${require("../../static/images/coupon-pack.png")}" alt="오뚜기몰 쿠폰 팩" />
  <div class="get-coupon-button">쿠폰팩 발급받기</div>
</div>
<div class="coupon-notice">
  <p class="notice-title">주의사항</p>
  <ul class="notice-list">
    <li>해당 쿠폰은 오뚜기몰 APP에서만 사용 가능합니다.</li>
    <li>오뚜기몰 신규 회원만 발급받을 수 있습니다.</li>
    <li>
      <strong>팔도, 삼양 제품</strong>에 한해 쿠폰을 사용할 수
      있습니다.
    </li>
    <li>쿠폰팩 이벤트는 회원 ID당 1회만 참여할 수 있습니다.</li>
    <li>발급된 쿠폰은 '마이페이지 > 쿠폰'에서 확인할 수 있습니다.</li>
    <li>
      진행 상황에 따라 이벤트 내용이 변경되거나 조기에 종료될 수
      있습니다.
    </li>
  </ul>
</div>
</div>`;

export const productPage = /* html */ `
<div class="inner-wrapper">
<div class="product-banner"></div>
<h3 class="product-page-title"></h3>
<div class="product-wrapper">
  <div class="product-tab">
    <p class="total-count">총 <span class="count"></span>건</p>
    <ul class="sort-tab">
      <li class="selected"><button>최신순</button></li>
      <li><button>높은 가격순</button></li>
      <li><button>낮은 가격순</button></li>
      <li><button>할인율순</button></li>
    </ul>
  </div>
  <ul class="product-list">
  </ul>
</div>
</div>
`;

export const productDetailPage = /* html */ `
<div class="inner-wrapper">
  <div class="product-detail-wrapper">
    <div class="sold-out">
        <p>해당 상품은 현재 품절되었습니다.</p>
    </div>
    <div class="spinner-wrapper">
      <div class="spinner"></div>
    </div>
  <div class="thumbnail">
    <img src="" alt="" />
  </div>
  <div class="info-wrapper">
    <div class="top-info">
      <p class="product-title"></p>
      <div class="product-price-area">
      <div class="product-price"><span class="price-num"></span>원</div>
      <div class="discount-rate"><span class="price-num"></span>%</div>
      <div class="origin-price"><span class="price-num"></span>원</div></div>
      <div class="product-login-text">로그인 후 구매하실 수 있습니다.</div>
      <div class="product-quantity">
        <div class="title">수량 선택</div>
        <button class="down-button" disabled>-</button>
        <div class="count">1</div>
        <button class="up-button">+</button>
      </div>
    </div>
    <div class="low-info">
      <div class="price-info">
        <div class="desc">총 상품금액</div>
        <div class="total-price"><span class="total-num"></span>원</div>
      </div>
      <div class="btn-wrapper">
        <button class="wish-btn">
        </button>
        <button class="cart-btn">장바구니담기</button>
      </div>
    </div>
  </div>
</div>
<div class="detail-img">
  <img src="/감자깡-상세페이지.jpeg" alt="상세페이지" />
</div></div>`;

export const cartPage = /* html */ `
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
                    <span class="push-btn-txt">상품을 선택해주세요</span>
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

export const myPage = /* html */ `
  <!-- USER INFO -->
  <section class="user-info">
    <div class="inner-wrapper">
      <div class="info">
        <div class="wrapper">
          <div class="profile-image"></div>
          <div class="title" id="displayName"></div>
        </div>
        <p class="sub-link"><a href="/mypage/modify" data-navigo>프로필 사진 변경하러 가기</a></p>
      </div>
      <div class="info">
        <a class="title" href="javascript:void(0)">
          <span>적립금</span>
          <p class="content">0 p</p>
        </a>
        <p class="sub-info">※ 100,000 포인트 <br /> 이상부터 사용 가능합니다.</p>
      </div>
      <div class="info">
        <a class="title" href="/coupon" data-navigo>
          <span>쿠폰</span>
          <p class="content" id="couponAmount"></p>
        </a>
        <p class="sub-info">※ 팔도, 삼양 제품에 한해 쿠폰을 사용할 수 있습니다.</p>
      </div>
      <div class="info">
        <a class="title" href="/mypage/modify" data-navigo>
          <span>회원 정보 수정</span>
        </a>
        <p class="sub-info">※ 마이페이지>개인정보 <br />수정에서 변경 가능합니다.</p>
      </div>
      <a class="banner" href="javascript:void(0)">
        <div class="banner-image"></div>
      </a>
    </div>
  </section>

  <div class="inner-wrapper">

    <!-- SIDE BAR -->
    <aside class="side-bar">
      <h2>마이페이지</h2>
      <ul class="menu">
        <li class="item">
          <a href="mypage/orderList" data-navigo>
            주문 내역
            <i class="bi bi-chevron-right"></i>
          </a>
        </li>
        <li class="item">
          <a href="mypage/account" data-navigo>
            계좌 관리
            <i class="bi bi-chevron-right"></i>
          </a>
        </li>
        <li class="item">
          <a href="mypage/like" data-navigo>
            찜한 상품
            <i class="bi bi-chevron-right"></i>
          </a>
        </li>
        <li class="item">
          <a href="mypage/modify" data-navigo>
            개인 정보 수정
            <i class="bi bi-chevron-right"></i>
          </a>
        </li>
      </ul>
      <a href="javascript:void(0)">
        <div>
          <span>도움이 필요하신가요 ?</span>
          <span>1:1 문의하기</span>
        </div>
        <i class="bi bi-chevron-right"></i>
      </a>
    </aside>

    <!-- MAIN SECTION -->
    <div class="main" id="myPageMain"></div>
  </div>

`;

export const orderListPage = /* html */ `
  <!-- USER INFO -->
  <section class="user-info">
    <div class="inner-wrapper">
      <div class="info">
        <div class="wrapper">
          <div class="profile-image"></div>
          <div class="title" id="displayName"></div>
        </div>
        <p class="sub-link"><a href="/mypage/modify" data-navigo>프로필 사진 변경하러 가기</a></p>
      </div>
      <div class="info">
        <a class="title" href="javascript:void(0)">
          <span>적립금</span>
          <p class="content">0 p</p>
        </a>
        <p class="sub-info">※ 100,000 포인트 <br /> 이상부터 사용 가능합니다.</p>
      </div>
      <div class="info">
        <a class="title" href="/coupon" data-navigo>
          <span>쿠폰</span>
          <p class="content" id="couponAmount"></p>
        </a>
        <p class="sub-info">※ 팔도, 삼양 제품에 한해 쿠폰을 사용할 수 있습니다.</p>
      </div>
      <div class="info">
        <a class="title" href="/mypage/modify" data-navigo>
          <span>회원 정보 수정</span>
        </a>
        <p class="sub-info">※ 마이페이지>개인정보 <br />수정에서 변경 가능합니다.</p>
      </div>
      <a class="banner" href="javascript:void(0)">
        <div class="banner-image"></div>
      </a>
    </div>
  </section>

  <div class="inner-wrapper mypage-wrapper">

    <!-- SIDE BAR -->
    <aside class="side-bar">
      <h2>마이페이지</h2>
      <ul class="menu">
        <li class="item">
          <a href="mypage/orderList" data-navigo>
            주문 내역
            <i class="bi bi-chevron-right"></i>
          </a>
        </li>
        <li class="item">
          <a href="mypage/account" data-navigo>
            계좌 관리
            <i class="bi bi-chevron-right"></i>
          </a>
        </li>
        <li class="item">
          <a href="mypage/like" data-navigo>
            찜한 상품
            <i class="bi bi-chevron-right"></i>
          </a>
        </li>
        <li class="item">
          <a href="mypage/modify" data-navigo>
            개인 정보 수정
            <i class="bi bi-chevron-right"></i>
          </a>
        </li>
      </ul>
      <a href="javascript:void(0)">
        <div>
          <span>도움이 필요하신가요 ?</span>
          <span>1:1 문의하기</span>
        </div>
        <i class="bi bi-chevron-right"></i>
      </a>
    </aside>

    <!-- MAIN SECTION -->
    <div class="order-list-wrapper">
    <div class="header">
    <div class="wrapper">
      <h2>주문 내역</h2>
      <p>최대 지난 3년간의 주문 내역까지 확인할 수 있어요</p>
    </div>
    <input type="text" id="myDatepicker" placeholder="날짜 선택" />
  </div>
  <div class="divider"></div>
  <ul class="order-list">
    <div class="skeleton-loading">
      <div class="skeleton"></div>
      <div class="skeleton"></div>
      <div class="skeleton"></div>
      <div class="skeleton"></div>
      <div class="skeleton"></div>
    </div>

    <div class="content"></div>
  </ul>

    </div>
  </div>

`;

export const accountPage = /* html */ `
  <!-- USER INFO -->
  <section class="user-info">
    <div class="inner-wrapper">
      <div class="info">
        <div class="wrapper">
          <div class="profile-image"></div>
          <div class="title" id="displayName"></div>
        </div>
        <p class="sub-link"><a href="/mypage/modify" data-navigo>프로필 사진 변경하러 가기</a></p>
      </div>
      <div class="info">
        <a class="title" href="javascript:void(0)">
          <span>적립금</span>
          <p class="content">0 p</p>
        </a>
        <p class="sub-info">※ 100,000 포인트 <br /> 이상부터 사용 가능합니다.</p>
      </div>
      <div class="info">
        <a class="title" href="/coupon" data-navigo>
          <span>쿠폰</span>
          <p class="content" id="couponAmount"></p>
        </a>
        <p class="sub-info">※ 팔도, 삼양 제품에 한해 쿠폰을 사용할 수 있습니다.</p>
      </div>
      <div class="info">
        <a class="title" href="/mypage/modify" data-navigo>
          <span>회원 정보 수정</span>
        </a>
        <p class="sub-info">※ 마이페이지>개인정보 <br />수정에서 변경 가능합니다.</p>
      </div>
      <a class="banner" href="javascript:void(0)">
        <div class="banner-image"></div>
      </a>
    </div>
  </section>

  <div class="inner-wrapper mypage-wrapper">

    <!-- SIDE BAR -->
    <aside class="side-bar">
      <h2>마이페이지</h2>
      <ul class="menu">
        <li class="item">
          <a href="mypage/orderList" data-navigo>
            주문 내역
            <i class="bi bi-chevron-right"></i>
          </a>
        </li>
        <li class="item">
          <a href="mypage/account" data-navigo>
            계좌 관리
            <i class="bi bi-chevron-right"></i>
          </a>
        </li>
        <li class="item">
          <a href="mypage/like" data-navigo>
            찜한 상품
            <i class="bi bi-chevron-right"></i>
          </a>
        </li>
        <li class="item">
          <a href="mypage/modify" data-navigo>
            개인 정보 수정
            <i class="bi bi-chevron-right"></i>
          </a>
        </li>
      </ul>
      <a href="javascript:void(0)">
        <div>
          <span>도움이 필요하신가요 ?</span>
          <span>1:1 문의하기</span>
        </div>
        <i class="bi bi-chevron-right"></i>
      </a>
    </aside>

    <!-- MAIN SECTION -->
    <div class="account-wrapper">
    <div class="header">
    <div class="wrapper">
      <h2>계좌 관리</h2>
    </div>
  </div>

  <div class="divider"></div>

  <div class="content">
    <!-- skeleton-loading -->
    <div class="skeleton-loading">
      <div class="skeleton"></div>
      <div class="skeleton"></div>
      <div class="skeleton"></div>
      <div class="skeleton skeleton-button"></div>
    </div>

    <!-- 등록된 계좌 출력 -->
    <ul class="account-list">
      <!-- <div class="no-list-wrapper">
        <p class="no-list">등록된 계좌가 없습니다.</p>
      </div> -->
      <!-- <li class="item">
        <div class="account-info">
          <span id="accountBank">NH농협은행</span>
          <span id="accountNumber">123-XXXX-XXXX-XX</span>
          <span id="accountBalance">3,000,000</span>
        </div>
        <button class="account-delete-btn">삭제</button>
      </li>
      <li class="item">
        <div class="account-info">
          <span class="accountBank">KB국민은행</span>
          <span class="accountNumber">123-XXXX-XXXX-XX</span>
          <span class="accountBalance">3,000,000</span>
        </div>
        <button class="account-delete-btn">삭제</button>
      </li> -->
    </ul>
    <!-- 계좌 등록 모달창 -->
    <input type="checkbox" id="modal" />
    <label for="modal" class="add-account-btn">계좌 추가</label>
    <div class="modal">
      <label for="modal" class="modal-overlay"></label>
      <div class="modal-contents">
        <h2>계좌 추가</h2>
        <form id="accountForm">
          <ul class="bank-list">
            <!-- <li class="item">
              <input type="radio" name="bank" id="004">
              <label for="004">KB국민은행 [3-2-4-3]</label>
            </li>
            <li class="item">
              <input type="radio" name="bank" id="088">
              <label for="088">신한은행 [3-3-6]</label>
            </li>
            <li class="item">
              <input type="radio" name="bank" id="020">
              <label for="020">우리은행 [4-3-6]</label>
            </li>
            <li class="item">
              <input type="radio" name="bank" id="081">
              <label for="081">하나은행 [3-6-5]</label>
            </li>
            <li class="item">
              <input type="radio" name="bank" id="011">
              <label for="011">NH농협은행 [3-4-4-2]</label>
            </li>
            <li class="item">
              <input type="radio" name="bank" id="090">
              <label for="090">카카오뱅크 [4-2-7]</label>
            </li> -->
          </ul>
          <div class="input-wrapper">
            <label for="accountNumber">계좌 번호</label>
            <input type="text" id="accountNumber" required placeholder="등록할 계좌번호를 입력해주세요." />
          </div>
          <div class="input-wrapper">
            <label for="phoneNumber">전화 번호</label>
            <input type="text" id="phoneNumber" required placeholder="사용자 전화번호를 입력해주세요." minlength="11"
              maxlength="11" />
          </div>
          <div class="account-info">
            <p>은행 옆의 []안의 숫자를 모두 더하면 각 은행의 유효한 계좌번호 길이가 됩니다.</p>
            <p>은행 당 한 계좌만 등록 가능합니다. 동일 은행의 다른 계좌를 등록하려면 기존<br />계좌를 삭제 후 등록하세요.</p>
            <p>계좌번호와 전화번호에는 ' - ' 구분이 없어야 합니다.</p>
          </div>
          <button class="confirm-btn">추가</button>
        </form>
        <div class="modal-spinner">
          <div class="spinner"></div>
        </div>
      </div>

    </div>
  </div>

    </div>
  </div>

`;

export const likePage = /* html */ `
    <!-- USER INFO -->
    <section class="user-info">
    <div class="inner-wrapper">
      <div class="info">
        <div class="wrapper">
          <div class="profile-image"></div>
          <div class="title" id="displayName"></div>
        </div>
        <p class="sub-link"><a href="/mypage/modify" data-navigo>프로필 사진 변경하러 가기</a></p>
      </div>
      <div class="info">
        <a class="title" href="javascript:void(0)">
          <span>적립금</span>
          <p class="content">0 p</p>
        </a>
        <p class="sub-info">※ 100,000 포인트 <br /> 이상부터 사용 가능합니다.</p>
      </div>
      <div class="info">
        <a class="title" href="/coupon" data-navigo>
          <span>쿠폰</span>
          <p class="content" id="couponAmount"></p>
        </a>
        <p class="sub-info">※ 팔도, 삼양 제품에 한해 쿠폰을 사용할 수 있습니다.</p>
      </div>
      <div class="info">
        <a class="title" href="/mypage/modify" data-navigo>
          <span>회원 정보 수정</span>
        </a>
        <p class="sub-info">※ 마이페이지>개인정보 <br />수정에서 변경 가능합니다.</p>
      </div>
      <a class="banner" href="javascript:void(0)">
        <div class="banner-image"></div>
      </a>
    </div>
  </section>

  <div class="inner-wrapper mypage-wrapper">

    <!-- SIDE BAR -->
    <aside class="side-bar">
      <h2>마이페이지</h2>
      <ul class="menu">
        <li class="item">
          <a href="mypage/orderList" data-navigo>
            주문 내역
            <i class="bi bi-chevron-right"></i>
          </a>
        </li>
        <li class="item">
          <a href="mypage/account" data-navigo>
            계좌 관리
            <i class="bi bi-chevron-right"></i>
          </a>
        </li>
        <li class="item">
          <a href="mypage/like" data-navigo>
            찜한 상품
            <i class="bi bi-chevron-right"></i>
          </a>
        </li>
        <li class="item">
          <a href="mypage/modify" data-navigo>
            개인 정보 수정
            <i class="bi bi-chevron-right"></i>
          </a>
        </li>
      </ul>
      <a href="javascript:void(0)">
        <div>
          <span>도움이 필요하신가요 ?</span>
          <span>1:1 문의하기</span>
        </div>
        <i class="bi bi-chevron-right"></i>
      </a>
    </aside>

    <!-- MAIN SECTION -->
    <div class="likelist-wrapper">
    <div class="main-head">
            <h2 class="main-text">찜한상품(<span></span>)</h2>
            <span class="text-side">찜한 상품은 최대 200개까지 저장됩니다.</span>
          </div>

          <div class="likelist-container">
            <!-- skeleton-loading -->
            <div class="skeleton-loading">
              <div class="skeleton"></div>
              <div class="skeleton"></div>
              <div class="skeleton"></div>
              <div class="skeleton"></div>
              <div class="skeleton"></div>
            </div>
            <div class="content">
              <!-- <p class="no-list">찜한 상품이 없습니다.</p> -->

              <!-- <div class="product-list-container">
              <img alt="" src="https://img-cf.kurly.com/shop/data/goods/1648206780555l0.jpeg" />
              <div class="product-detail-section">
                <div class="product-text-container">
                  <div class="product-title">
                    <a href="javascript:void(0)" class="product-name">[사미헌] 갈비탕</a>
                  </div>
                  <div class="product-price">
                    <span class="product-discount-price">11,000원</span>
                    <span class="product-cost-price">12,000원</span>
                  </div>
                </div>
                <div class="product-button-section">
                  <button class="delete-button">삭제</button>
                  <button class="take-button">
                    <img
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNiAzNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTM2IDM2SDBWMGgzNnoiLz4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1LjE2NCA2LjU0NykiIHN0cm9rZT0iIzVmMDA4MCIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjciPgogICAgICAgICAgICA8cGF0aCBkPSJtMjUuNjggMy42Ni0yLjcyIDExLjU3SDcuMzdMNC42NiAzLjY2eiIvPgogICAgICAgICAgICA8Y2lyY2xlIGN4PSIyMC41MiIgY3k9IjIwLjc4IiByPSIyLjE0Ii8+CiAgICAgICAgICAgIDxjaXJjbGUgY3g9IjkuODEiIGN5PSIyMC43OCIgcj0iMi4xNCIvPgogICAgICAgICAgICA8cGF0aCBkPSJNMCAwaDMuOGwxLjc2IDcuNSIvPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg=="
                      alt="장바구니 담기" />
                    담기
                  </button>
                </div>
              </div>
            </div> -->
            </div>
          </div>
    </div>
  </div>
`;

export const modifyPage = /* html */ `
        <!-- USER INFO -->
        <section class="user-info">
        <div class="inner-wrapper">
          <div class="info">
            <div class="wrapper">
              <div class="profile-image"></div>
              <div class="title" id="displayName"></div>
            </div>
            <p class="sub-link"><a href="/mypage/modify" data-navigo>프로필 사진 변경하러 가기</a></p>
          </div>
          <div class="info">
            <a class="title" href="javascript:void(0)">
              <span>적립금</span>
              <p class="content">0 p</p>
            </a>
            <p class="sub-info">※ 100,000 포인트 <br /> 이상부터 사용 가능합니다.</p>
          </div>
          <div class="info">
            <a class="title" href="/coupon" data-navigo>
              <span>쿠폰</span>
              <p class="content" id="couponAmount"></p>
            </a>
            <p class="sub-info">※ 팔도, 삼양 제품에 한해 쿠폰을 사용할 수 있습니다.</p>
          </div>
          <div class="info">
            <a class="title" href="/mypage/modify" data-navigo>
              <span>회원 정보 수정</span>
            </a>
            <p class="sub-info">※ 마이페이지>개인정보 <br />수정에서 변경 가능합니다.</p>
          </div>
          <a class="banner" href="javascript:void(0)">
            <div class="banner-image"></div>
          </a>
        </div>
      </section>

      <div class="inner-wrapper mypage-wrapper">

        <!-- SIDE BAR -->
        <aside class="side-bar">
          <h2>마이페이지</h2>
          <ul class="menu">
            <li class="item">
              <a href="mypage/orderList" data-navigo>
                주문 내역
                <i class="bi bi-chevron-right"></i>
              </a>
            </li>
            <li class="item">
              <a href="mypage/account" data-navigo>
                계좌 관리
                <i class="bi bi-chevron-right"></i>
              </a>
            </li>
            <li class="item">
              <a href="mypage/like" data-navigo>
                찜한 상품
                <i class="bi bi-chevron-right"></i>
              </a>
            </li>
            <li class="item">
              <a href="mypage/modify" data-navigo>
                개인 정보 수정
                <i class="bi bi-chevron-right"></i>
              </a>
            </li>
          </ul>
          <a href="/mypage/inquiry/list" class="css-17gln34 e19l01ug3">
            <div>
              <span>도움이 필요하신가요 ?</span>
              <span>1:1 문의하기</span>
            </div>
            <i class="bi bi-chevron-right"></i>
          </a>
        </aside>

        <!-- MAIN SECTION -->
        <div class="modify-wrapper">

          <!-- SECTION HEADER -->
          <div class="header">
            <h2>개인 정보 수정</h2>
          </div>

          <!-- SECTION CONTENT -->
          <div class="content">
            <form action="" autocomplete="off">
              <fieldset>
                <div class="modify-section">
                  <div class="modify-text">
                    <label class="label-id" for="password">현재 비밀번호</label>
                  </div>
                  <div class="modify-box">
                    <input type="password" id="password" placeholder="현재 비밀번호를 입력해주세요." required />
                    <span class="error-message"></span>
                  </div>
                </div>
                <div class="modify-section">
                  <div class="modify-text">
                    <label class="label-id" for="newPassword">새 비밀번호</label>
                  </div>
                  <div class="modify-box">
                    <input type="password" id="newPassword" placeholder="새 비밀번호를 입력해주세요." required />
                    <span class="error-message"></span>
                  </div>
                </div>
                <div class="modify-section">
                  <div class="modify-text">
                    <label class="label-id" for="newPasswordCheck">비밀번호 확인</label>
                  </div>
                  <div class="modify-box">
                    <input type="password" id="newPasswordCheck" placeholder="비밀번호를 다시 입력해주세요." required />
                    <span class="error-message">비밀번호가 일치하지 않습니다.</span>
                  </div>
                </div>
                <div class="modify-section">
                  <div class="modify-text">
                    <label class="label-id" for="userName">이름</label>
                  </div>
                  <div class="modify-box">
                    <input type="text" id="userName" placeholder="이름을 입력해주세요." required />
                    <span class="error-message">사용자 이름은 20자 이하여야 합니다.</span>
                  </div>
                </div>
                <div class="modify-section">
                  <div class="modify-text">
                    <label class="label-id">주소</label>
                  </div>
                  <div class="modify-box address-box">
                    <div class="inline-div">
                      <input type="text" id="postcode" placeholder="우편번호" disabled />
                      <button class="find-address">우편번호 찾기</button>
                    </div>
                    <input type="text" id="roadAddress" placeholder="도로명주소" disabled />
                    <input type="text" id="detailAddress" placeholder="상세주소" />
                  </div>
                </div>
                <div class="modify-section">
                  <div class="modify-text">
                    <label class="label-id">프로필</label>
                  </div>
                  <div class="modify-box">
                    <input id="userThumbnail" type="file" />
                    <span class="error-message"></span>
                    <figure class="check-thumbnail"></figure>
                  </div>
                </div>
                <button class="modify-button">수정하기</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
`;

export const orderSheetPage = /* html */ `
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
              <button class="close-message-btn"></button>
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

                <div>
                  <span>사용가능 적립금</span>
                  <span class="accumalated-cash">0</span>
                  <span>원</span>
                </div>

                <div>적립금 내역: 마이페이지>적립금</div>

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

        <div class="pay-btn-area">
          <button type="button" width="240" height="56" radius="3">
            <span>
              <span id="totalAmountInBtn"></span>원 결제하기
            </span>
            <div class="spinner-wrapper">
              <div class="spinner"></div>
            </div>
          </button>
        </div>
      </div>

`;
