import { headers } from "./headers";

export async function logInFn(data) {
  const res = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login",
    {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((result) => {
      setUserInfo(result, data);
      history.back();
    })
    .catch(() => {
      Swal.fire({
        icon: "error",
        text: "아이디 및 비밀번호를 확인해주세요!",
      });
    });
}

function setUserInfo(result, data) {
  // localStorage에 loginInfoData 세팅
  let loginInfoData = localStorage.getItem("loginInfo");
  if (!loginInfoData) {
    loginInfoData = { accessToken: "", loginId: "" };
  } else {
    loginInfoData = JSON.parse(loginInfoData);
  }
  loginInfoData.accessToken = result.accessToken;
  loginInfoData.loginId = data.email;
  localStorage.setItem("loginInfo", JSON.stringify(loginInfoData));

  // localStorage에 userEmail 데이터 세팅
  let userEmail = localStorage.getItem(data.email);
  let userData = result.user;
  console.log(userData);
  if (!userEmail)
    localStorage.setItem(data.email, JSON.stringify({ userInfo: userData }));
}
