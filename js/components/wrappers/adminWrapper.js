export default /* html */ `
<div id="adminWrapper">
  <div class="loader-wrapper">
    <div class="loader"></div>
  </div>
  <header class="admin-header">
    <div class="header-wrapper">
      <a class="logo" href="report" data-navigo></a>
      <div class="admin-info">
        <div class="info-name">관리자</div>
        <a href="/" class="info-logout" data-navigo>로그아웃</a>
      </div>
    </div>
  </header>
  <section class="container">
    <div class="left-nav-bar">
      <div class="side-menu-wrapper">
        <a href="report" class="side-menu report" data-navigo>
          <div class="menu-title">보고서</div>
        </a>
        <a href="product" class="side-menu management" data-navigo>
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
