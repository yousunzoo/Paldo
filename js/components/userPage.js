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
          <div class="skeleton-loading">
            <div class="loading-image"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
          </div>
        </div>
        <div class="swiper-slide skeleton-slide">
          <div class="skeleton-loading">
            <div class="loading-image"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
          </div>
        </div>
        <div class="swiper-slide skeleton-slide">
          <div class="skeleton-loading">
            <div class="loading-image"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
          </div>
        </div>
        <div class="swiper-slide skeleton-slide">
          <div class="skeleton-loading">
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
<section class="prd-list2">
  <h2 class="main-title">이 상품 어때요?</h2>
  <!-- product swiper -->
  <div class="main-product-swiper">
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide skeleton-slide">
          <div class="skeleton-loading">
            <div class="loading-image"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
          </div>
        </div>
        <div class="swiper-slide skeleton-slide">
          <div class="skeleton-loading">
            <div class="loading-image"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
          </div>
        </div>
        <div class="swiper-slide skeleton-slide">
          <div class="skeleton-loading">
            <div class="loading-image"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
          </div>
        </div>
        <div class="swiper-slide skeleton-slide">
          <div class="skeleton-loading">
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
    <a class="banner-more-btn" href="./coupon.html">자세히 보기</a>
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
        <div class="skeleton-loading">
          <div class="skeleton-text skeleton"></div>
          <div class="skeleton-text skeleton"></div>
        </div>
        <div class="skeleton-button skeleton"></div>
      </li>
      <li class="skeleton-li">
        <div class="skeleton-img skeleton"></div>
        <div class="skeleton-loading">
          <div class="skeleton-text skeleton"></div>
          <div class="skeleton-text skeleton"></div>
        </div>
        <div class="skeleton-button skeleton"></div>
      </li>
      <li class="skeleton-li">
        <div class="skeleton-img skeleton"></div>
        <div class="skeleton-loading">
          <div class="skeleton-text skeleton"></div>
          <div class="skeleton-text skeleton"></div>
        </div>
        <div class="skeleton-button skeleton"></div>
      </li>
      <li class="skeleton-li">
        <div class="skeleton-img skeleton"></div>
        <div class="skeleton-loading">
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
          <h3 class="product-title"></h3>
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
