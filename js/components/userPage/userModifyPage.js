export default /* html */ `
  <!-- USER INFORMATION -->
  <section class="user-information">
    <div class="inner-wrapper">
      <div class="information">
        <div class="wrapper">
          <div class="profile-image"></div>
          <div class="title" id="displayName"></div>
        </div>
        <p class="sub-link"><a href="/mypage/modify" data-navigo>프로필 사진 변경하러 가기</a></p>
      </div>
      <div class="information">
        <a class="title" href="javascript:void(0)">
          <span>적립금</span>
          <p class="content">0 p</p>
        </a>
        <p class="sub-information">※ 100,000 포인트 <br /> 이상부터 사용 가능합니다.</p>
      </div>
      <div class="information">
        <a class="title" href="/coupon" data-navigo>
          <span>쿠폰</span>
          <p class="content" id="couponAmount"></p>
        </a>
        <p class="sub-information">※ 팔도, 삼양 제품에 한해 쿠폰을 사용할 수 있습니다.</p>
      </div>
      <div class="information">
        <a class="title" href="/mypage/modify" data-navigo>
          <span>개인 정보 수정</span>
        </a>
        <p class="sub-information">※ 마이페이지>개인정보 <br />수정에서 변경 가능합니다.</p>
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
        <li class="item active">
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
            <div class="modify-button-wrapper">
              <button class="modify-button">수정하기</button>
              <div class="spinner-wrapper">
                <div class="spinner"></div>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
`;
