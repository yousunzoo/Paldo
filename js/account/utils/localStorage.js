export function getAccessTokenFromLocalStorage () {
  const json = localStorage.getItem('loginInfo');
  const loginInfo = JSON.parse(json);
  return loginInfo.accessToken;
}