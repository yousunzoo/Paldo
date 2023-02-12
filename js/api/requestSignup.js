import { headers, url } from "./headers";

export async function requestSignup(signupData) {
  const res = await fetch(`${url}auth/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify(signupData),
  })
    .then((response) => {
      if (!response.ok) {
        return error;
      }
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
}
