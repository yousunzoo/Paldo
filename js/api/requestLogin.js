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
      return response.json();
    })
    .then((result) => {
      return result;
    });
  return res;
}
