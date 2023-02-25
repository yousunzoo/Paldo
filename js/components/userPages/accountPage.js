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
        <li class="item active">
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
            <button class="account-delete-button">삭제</button>
          </li>
          <li class="item">
            <div class="account-info">
              <span class="accountBank">KB국민은행</span>
              <span class="accountNumber">123-XXXX-XXXX-XX</span>
              <span class="accountBalance">3,000,000</span>
            </div>
            <button class="account-delete-button">삭제</button>
          </li> -->
        </ul>
        <!-- 계좌 등록 모달창 -->
        <input type="checkbox" id="modal" />
        <label for="modal" class="add-account-button">계좌 추가</label>
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
                <p>은행 옆의 []안의 숫자를 더하면 각 은행의 유효한 계좌번호 길이가 됩니다.</p>
                <p>은행 당 한 계좌만 등록 가능합니다. 동일 은행의 다른 계좌를 등록하려면 기존 계좌를 삭제 후 등록하세요.</p>
                <p>계좌번호와 전화번호에는 ' - ' 구분이 없어야 합니다.</p>
              </div>
              <button class="confirm-button">추가</button>
            </form>
            <div class="modal-spinner">
              <div class="spinner"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`
