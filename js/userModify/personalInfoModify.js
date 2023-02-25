// import { checkAuthorization } from '../api/checkAuthorization.js'
import { SORT_TYPES, getLocalStorageData } from '../localStorage/getLocalStorageData';
import getAddress from '../library/postcode.js';
import { requestPersonalInfoModify } from '../api/requestPersonalInfoModify.js'
import { setProfile } from '../userProfile/profile.js'

/* GLOBAL LOGIC */
// ;(async function () {
//   const isValidUser = await checkAuthorization();
//   if(isValidUser) {
//     initPage();
//   } else {
//     Swal.fire({
//       icon: 'error',
//       title: '사용자 세션이 만료되었습니다.',
//       text: '로그인 페이지로 이동합니다.',
//     })
//     // 로그인 페이지로 redirect
//     // location.assign('로그인 페이지 경로')
//   }
// })()

export function setModifyPage() {
  /* GLOBAL VARIABLES */
  const { USER_INFO, USER_ADDRESS } = SORT_TYPES
  const userInfo = {
    oldPassword: '',
    newPassword: '',
    displayName: ''
  };
  const userAddress = {};
  const validCheck = {
    newPassword: false,
    newPasswordCheck: false,
  };

  /* DOM */
  const findAddresssButton = document.querySelector('.find-address');
  const passwordInput = document.querySelector('#password');
  const newPasswordInputEl = document.querySelector('#newPassword');
  const newPasswordCheckInputEl = document.querySelector('#newPasswordCheck');
  const userNameInput = document.querySelector('#userName');
  const modifyButton = document.querySelector('.modify-button');
  const thumbnailInput = document.querySelector('#userThumbnail');
  const thumbnailFigure = document.querySelector('.check-thumbnail');

  initPage();

  // 수정 버튼 클릭
  modifyButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const isInvalid = Object.values(validCheck).includes(false);
    if (isInvalid) {
      Swal.fire({
        icon: 'error',
        text: '입력하신 정보를 확인해주세요.',
      });
      return;
    }
    // 주소 체크
    addressCheck();

    // 서버에 회원정보 수정 요청
    await requestPersonalInfoModify(userInfo, userAddress);
    initPage();
    setProfile();
  });

  // 현재 비밀번호
  passwordInput.addEventListener('input', (event) => {
    userInfo.oldPassword = event.target.value;
  })

  // 새 비밀번호 유효성 검사
  newPasswordInputEl.addEventListener('input', (event) => {
    validPasswordCheck(event.target.value);
  })

  // 비밀번호 재확인
  newPasswordCheckInputEl.addEventListener('input', (event) => {
    samePasswordCheck(event.target.value);
  })

  // 사용자 이름 유효성 검사
  userNameInput.addEventListener('input', (event) => {
    validUserNameCheck(event.target.value);
  });

  // 주소 검색
  findAddresssButton.addEventListener('click', (event) => {
    event.preventDefault();
    getAddress();
  });

  // 썸네일 파일 업로드 시 썸네일 보이도록
  thumbnailInput.addEventListener('change', () => {
    const file = thumbnailInput.files[0];
    validThumbnailCheck(file);
  });

  /* FUNCTIONS */
  function initPage() {
    /* 기존 정보 출력 */
    // input 초기화
    passwordInput.value = '';
    newPasswordInputEl.value = '';
    newPasswordCheckInputEl.value = '';

    // userName
    const userName = getLocalStorageData(USER_INFO).displayName || '';
    const userNameEl = document.querySelector('#userName');
    userNameEl.value = userName;

    // userAddress
    // "userAddress":{"detailAddress":"101호","postcode":"03054","roadAddress":"서울 종로구 청와대로 73"}
    const userAddress = getLocalStorageData(USER_ADDRESS);
    const { detailAddress = '', postcode = '', roadAddress = '' } = userAddress;

    const postcodeEl = document.querySelector('#postcode');
    postcodeEl.value = postcode;

    const roadAddressEl = document.querySelector('#roadAddress');
    roadAddressEl.value = roadAddress;

    const detailAddressEl = document.querySelector('#detailAddress');
    detailAddressEl.value = detailAddress;
  }
  function validPasswordCheck(password) {
    const oldPassword = passwordInput.value;
    const num = password.search(/[0-9]/g);
    const eng = password.search(/[a-z]/gi);
    const passwordErrorMesssage =
    newPasswordInputEl.parentElement.querySelector('.error-message');
    if (password.length < 8 || password.length > 20) {
      passwordErrorMesssage.textContent =
        '비밀번호를 8자리 이상 20자리 이하로 입력해주세요.';
      passwordErrorMesssage.classList.add('active');
      newPasswordInputEl.classList.add('error');
      validCheck.newPassword = false;
    } else if (password.search(/\s/) != -1) {
      passwordErrorMesssage.textContent = '비밀번호는 공백 없이 입력해주세요.';
      !passwordErrorMesssage.classList.contains('active') &&
        passwordErrorMesssage.classList.add('active');
      newPasswordInputEl.classList.add('error');
      validCheck.newPassword = false;
    } else if (num < 0 || eng < 0) {
      passwordErrorMesssage.textContent = '영문,숫자를 혼합하여 입력해주세요.';
      !passwordErrorMesssage.classList.contains('active') &&
        passwordErrorMesssage.classList.add('active');
      newPasswordInputEl.classList.add('error');
      validCheck.newPassword = false;
    } else if (oldPassword === password) {
      passwordErrorMesssage.textContent = '현재 비밀번호와 다른값을 입력해야 합니다.';
      !passwordErrorMesssage.classList.contains('active') &&
        passwordErrorMesssage.classList.add('active');
      newPasswordInputEl.classList.add('error');
      validCheck.newPassword = false;
    } else {
      if (passwordInput.parentElement.querySelector('.error-message')) {
        passwordErrorMesssage.classList.remove('active');
        newPasswordInputEl.classList.remove('error');
        validCheck.newPassword = true;
        userInfo.newPassword = password;
      }
    }
  }
  function samePasswordCheck(password) {
    const enteredPassword = newPasswordInputEl.value;
    const samePasswordCheckSpan =
      newPasswordCheckInputEl.parentElement.querySelector('.error-message');

    if (password != enteredPassword) {
      samePasswordCheckSpan.classList.add('active');
      newPasswordCheckInputEl.classList.add('error');
    } else {
      if (samePasswordCheckSpan.classList.contains('active')) {
        samePasswordCheckSpan.classList.remove('active');
        newPasswordCheckInputEl.classList.remove('error');
      }
      validCheck.newPasswordCheck = true;
    }
  }
  function validUserNameCheck(userName) {
    const errorMessageSpan =
      userNameInput.parentElement.querySelector('.error-message');
    if (userName.length > 20) {
      errorMessageSpan.classList.add('active');
      userNameInput.classList.add('error');
      validCheck.displayName = false;
    } else {
      if (errorMessageSpan.classList.contains('active')) {
        errorMessageSpan.classList.remove('active');
        userNameInput.classList.remove('error');
      }
      validCheck.displayName = true;
      userInfo.displayName = userName;
    }
  }
  function addressCheck() {
    // 주소 값 변경되는 것 탐색
    const addressInputs = document
      .querySelector('.address-box')
      .querySelectorAll('input');

    addressInputs.forEach((input) => {
      const inputId = input.id;
      userAddress[inputId] = input.value;
    });
  }
  function validThumbnailCheck(file) {
    const MAXIMUM_SIZE = 1000000;
    const validFileType = [
      'image/jpg',
      'image/jpeg',
      'image/webp',
      'image/png',
      'image/gif',
      'image/svg+xml',
    ];
    const errorMessageSpan =
      thumbnailInput.parentElement.querySelector('.error-message');
    // 파일 크기 1MB 이하
    if (file.size > MAXIMUM_SIZE) {
      errorMessageSpan.textContent = '파일 크기는 1MB 이하여야 합니다.';
      errorMessageSpan.classList.add('active');
      validCheck.thumbnail = false;
      return;
    } else if (!validFileType.includes(file.type)) {
      errorMessageSpan.textContent = '유효한 파일 형식이 아닙니다.';
      !errorMessageSpan.classList.contains('active') &&
        errorMessageSpan.classList.add('active');
      validCheck.thumbnail = false;
      return;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', (e) => {
        const profileImgBase64 = e.target.result;
        thumbnailFigure.innerHTML = `<img src=${profileImgBase64} alt='선택한 사진' />`;
        validCheck.thumbnail = true;
        userInfo.profileImgBase64 = profileImgBase64;
      });
    }
  }
}
