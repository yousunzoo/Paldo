import { headers, url } from "./headers";

export async function checkAuthorization() {
  const loginInfo = localStorage.getItem("loginInfo");
  if (loginInfo) {
    const accessToken = JSON.parse(loginInfo).accessToken;
    return await checkAuthorizationAPI(accessToken);
  }
  return false;
}

async function checkAuthorizationAPI(accessToken) {
  const res = await fetch(`${url}auth/me`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
      masterKey: true,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((result) => {
      return result ? true : false;
    });
  return res;
}
