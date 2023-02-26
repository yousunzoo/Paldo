import { headers, url } from "./headers";

export async function requestLogout() {
  const loginInfo = localStorage.getItem("loginInfo");
  const accessToken = JSON.parse(loginInfo).accessToken;
  return await logoutFn(accessToken);
}

async function logoutFn(accessToken) {
  try {
    const res = await fetch(`${url}auth/logout`, {
      method: "POST",
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(response.status);
    }
    const json = await res.json();
    return json;
  } catch (error) {
    return null;
  }
}
