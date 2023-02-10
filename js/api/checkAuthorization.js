import { headers } from "./headers";

export async function checkAuthorization(accessToken) {
  const res = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me",
    {
      method: "POST",
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
        masterKey: true,
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result ? true : false;
    });
  return res;
}
