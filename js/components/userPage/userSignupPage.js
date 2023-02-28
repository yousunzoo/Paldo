export default /* html */ `
<div class="inner-signup-wrapper">
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
