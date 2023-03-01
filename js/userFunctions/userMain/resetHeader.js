export default function resetHeader() {
  const headerMenu = document.querySelector(".header-menu");
  headerMenu.innerHTML = `<li class="header-menu-item">
  <a href="/signup" data-navigo>회원가입</a>
</li>
<li class="header-menu-item">
  <a href="/login" data-navigo>로그인</a>
</li>`;
}
