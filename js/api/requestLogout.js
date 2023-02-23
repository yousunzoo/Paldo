import { resetHeader } from "../main/changeHeader";
import { headers, url } from "./headers";

export async function requestLogout() {
  const loginInfo = localStorage.getItem("loginInfo");
  const accessToken = JSON.parse(loginInfo).accessToken;
  return await logoutFn(accessToken);
}

async function logoutFn(accessToken) {
  const res = await fetch(`${url}auth/logout`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((result) => {
      const loginedId = JSON.parse(localStorage.getItem("loginInfo")).loginId;
      if (loginedId != "admin@paldo.com") {
        resetHeader();
      }
      return result;
    });
  return res;
}
