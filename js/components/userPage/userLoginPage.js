export default /* html */ `
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
            <button class="login-button">로그인</button>
            <a class="signup-button" href="/signup" data-navigo>회원가입</a>
          </fieldset>
        </form>
      </div>`;
