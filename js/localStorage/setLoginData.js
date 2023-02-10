export function setUserInfo(result, email) {
  // localStorage에 loginInfoData 세팅
  let loginInfoData = localStorage.getItem("loginInfo");
  if (!loginInfoData) {
    loginInfoData = { accessToken: "", loginId: "" };
  } else {
    loginInfoData = JSON.parse(loginInfoData);
  }
  loginInfoData.accessToken = result.accessToken;
  loginInfoData.loginId = email;
  localStorage.setItem("loginInfo", JSON.stringify(loginInfoData));

  // localStorage에 userEmail 데이터 세팅
  let userEmail = localStorage.getItem(email);
  let userData = result.user;
  if (!userEmail)
    localStorage.setItem(email, JSON.stringify({ userInfo: userData }));
}
