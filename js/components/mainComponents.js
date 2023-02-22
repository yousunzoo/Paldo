export const adminWrapper = /* html */ `
<div id="adminWrapper">
  <header class="admin-header">
    <div class="header-wrapper">
      <a class="logo" href="report" data-navigo></a>
      <div class="admin-info">
        <div class="info-name">관리자</div>
        <a href="logout" class="info-logout">로그아웃</a>
      </div>
    </div>
  </header>
  <section class="container">
    <div class="left-nav-bar">
      <div class="side-menu-wrapper">
        <a href="report" class="side-menu report" data-navigo>
          <div class="menu-title">보고서</div>
        </a>
<<<<<<< HEAD
        <a href="adminproduct/" class="side-menu management" data-navigo>
=======
        <a href="product" class="side-menu management" data-navigo>
>>>>>>> c54931047decbd97433e6b3dbb7a47678b85e523
          <div class="menu-title">상품 관리</div>
        </a>
        <a
          href="transaction"
          class="side-menu transaction-history"
          data-navigo>
          <div class="menu-title">거래 내역 관리</div>
        </a>
      </div>
    </div>
    <div class="right-nav-bar" id="content"></div>
  </section>
</div>`;

export const userWrapper = /* html */ `
<div id="userWrapper">
  <header>
    <div class="inner-wrapper">
      <div class="header-top">
        <ul class="header-menu login-menu">
          <li class="header-menu-item">
            <a href="/signup" data-navigo>회원가입</a>
          </li>
          <li class="header-menu-item">
            <a href="/login" data-navigo>로그인</a>
          </li>
        </ul>

        <div class="header-items">
          <a class="logo" href="/" data-navigo>
            <img src="${require("../../static/images/logo.png")}" alt="오뚜기 몰" />
          </a>
          <form class="search">
            <input
              type="text"
              id="gnbSearch"
              placeholder="검색어를 입력해주세요" />
            <button class="search-btn"></button>
          </form>
          <ul class="header-icon-menus">
            <li><a href="javascript:void(0)" aria-label="찜목록"></a></li>
            <li>
              <a href="/cart" data-navigo aria-label="장바구니"></a>
            </li>
          </ul>
        </div>
      </div>
      <div class="header-bottom">
        <ul class="header-tablist">
          <li class="header-tablist-item">
            <a href="/products/new" data-navigo>신상품</a>
          </li>
          <li class="header-tablist-item">
            <a href="/products/best" data-navigo>베스트</a>
          </li>
          <li class="header-tablist-item">
            <a href="/products/frugal" data-navigo>알뜰쇼핑</a>
          </li>
          <li class="header-tablist-item">
            <a href="/coupon" data-navigo>특가/혜택</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
  <div id="content-wrapper">
    <section id="main"></section>
    <div id="sidebar-area">
      <article id="sidebar">
        <p>최근 본 상품</p>
        <div class="swiper">
          <div class="swiper-wrap">
            <div class="swiper-wrapper"></div>
          </div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </article>
    </div>
  </div>
  <footer>
    <div class="inner-wrapper">
      <div class="footer-team-info1">
        <div class="team-name">
          <img src="./static/images/team_logo.png" alt="전국팔도" />
          <div class="team-name-desc">
            <div class="team-title-area">
              <p class="team-title">Team</p>
              <p class="team-desc">전국팔도</p>
            </div>
            <a
              href="https://github.com/KDT4-team6/Ottogi"
              class="github-link"
              >https://github.com/KDT4-team6/Ottogi</a
            >
          </div>
        </div>
        <ul class="team-members">
          <li class="team-member">
            <div class="profile-thumbnail"></div>
            <div class="profile-info">
              <div class="profile-info-title">
                <p class="profile-tag">팀장</p>
                <p class="member-name">권범준</p>
              </div>
              <a href="https://github.com/kjungit" class="member-github"
                >https://github.com/kjungit</a
              >
            </div>
          </li>
          <li class="team-member">
            <div class="profile-thumbnail"></div>
            <div class="profile-info">
              <div class="profile-info-title">
                <p class="profile-tag">팀원</p>
                <p class="member-name">고봉석</p>
              </div>
              <a href="https://github.com/bongsee" class="member-github"
                >https://github.com/bongsee</a
              >
            </div>
          </li>
          <li class="team-member">
            <div class="profile-thumbnail"></div>
            <div class="profile-info">
              <div class="profile-info-title">
                <p class="profile-tag">팀원</p>
                <p class="member-name">유선주</p>
              </div>
              <a href="https://github.com/yousunzoo" class="member-github"
                >https://github.com/yousunzoo</a
              >
            </div>
          </li>
          <li class="team-member">
            <div class="profile-thumbnail"></div>
            <div class="profile-info">
              <div class="profile-info-title">
                <p class="profile-tag">팀원</p>
                <p class="member-name">조성민</p>
              </div>
              <a href="https://github.com/FranzCho" class="member-github"
                >https://github.com/FranzCho</a
              >
            </div>
          </li>
          <li class="team-member">
            <div class="profile-thumbnail"></div>
            <div class="profile-info">
              <div class="profile-info-title">
                <p class="profile-tag">팀원</p>
                <p class="member-name">김재도</p>
              </div>
              <a href="https://github.com/KJDsports" class="member-github"
                >https://github.com/KJDsports</a
              >
            </div>
          </li>
        </ul>
      </div>
      <div class="footer-team-info2">
        <div class="team-skillset">
          <p class="footer-title">Our skills</p>
          <div class="skill-list">
            <img src="${require("../../static/images/icon-html.svg")}" alt="HTML5" />
            <img src="${require("../../static/images/icon-css.svg")}" alt="CSS3" />
            <img
              src="${require("../../static/images/icon-javascript.svg")}"
              alt="JavaScript" />
            <img src='${require("../../static/images/icon-sass.svg")}' alt="Sass" />
          </div>
          <div class="tool-list">
            <img src="${require("../../static/images/icon-figma.svg")}" alt="Figma" />
            <img src="${require("../../static/images/icon-vscode.svg")}" alt="VSCode" />
            <img src="${require("../../static/images/icon-github.svg")}" alt="Github" />
            <img src="${require("../../static/images/icon-psd.svg")}" alt="Photoshop" />
          </div>
        </div>
        <div class="team-inquiry">
          <p class="footer-title">1:1 문의</p>
          <div class="inquiry-area">
            <a
              class="inquiry-btn"
              href="https://github.com/KDT4-team6/Ottogi"
              >문의하기</a
            >
            <p class="inquiry-text">
              365일<br />
              고객센터 운영시간에 순차적으로 답변드리겠습니다.
            </p>
          </div>
          <div class="inquiry-email">
            <p>비회원 문의 : help1@jeongukpaldo.com</p>
            <p>비회원 대량주문 문의 : help2@jeongukpaldo.com</p>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright">
      <p>© 2023. JeonGukPaldo All rights reserved.</p>
    </div>
  </footer>
  <button id="to-top-button">
    <span class="material-symbols-outlined"> arrow_upward </span>
  </button>
</div>`;
