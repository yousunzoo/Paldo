import { headers, url } from "./headers";

export async function checkAuthorization() {
  const loginInfo = localStorage.getItem("loginInfo");
  if (loginInfo) {
    const accessToken = JSON.parse(loginInfo).accessToken;
    return await checkAuthorizationAPI(accessToken, JSON.parse(loginInfo));
  }
  return false;
}

async function checkAuthorizationAPI(accessToken) {
  try {
    const res = await fetch(`${url}auth/me`, {
      method: "POST",
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(res.status);
    }
    const json = await res.json();
    console.log(json);
    return json ? true : false;
  } catch (error) {
    return null;
  }
}
