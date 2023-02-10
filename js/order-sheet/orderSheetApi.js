import { headers } from "./headers";

const headers = {
  "content-type": "application/json",
  apikey: "FcKdtJs202301",
  username: "KDT4_Team6",
}

export async function login() {
  const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email: "testuser@gmail.com",
      password: "12345678"
    })
  })
  const json = res.json();
  return json;
}

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