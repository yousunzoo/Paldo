export default /* html */ `
<div class="main-banner">
<div class="swiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <img
        src="${require("../../../static/images/main_banner_01.png")}"
        alt="main banner 1" />
    </div>
    <div class="swiper-slide">
      <img
        src="${require("../../../static/images/main_banner_02.png")}"
        alt="main banner 2" />
    </div>
    <div class="swiper-slide">
      <img
        src="${require("../../../static/images/main_banner_03.png")}"
        alt="main banner 3" />
    </div>
  </div>
  <button class="swiper-button-prev"></button>
  <button class="swiper-button-next"></button>
</div>
</div>
<div class="inner-wrapper">
<section class="product-list1">
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
<section class="product-list2">
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
        src="${require("../../../static/images/recommand_banner.png")}"
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
