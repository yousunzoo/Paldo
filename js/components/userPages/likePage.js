export default
/* html */`
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
        <li class="item active">
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
          <!-- <p class="no-list">찜한 상품이 없습니다.</p>

          <div class="product-list-container">
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
`
