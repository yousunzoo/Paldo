export default /* html */ `
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
        <li class="item active">
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
