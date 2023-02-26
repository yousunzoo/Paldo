import { headers, url } from "./headers";

export async function requestSignup(signupData) {
  try {
    const res = await fetch(`${url}auth/signup`, {
      method: "POST",
      headers,
      body: JSON.stringify(signupData),
    });
    if (!res.ok) {
      throw new Error(res.status);
    }
    const json = await res.json();
    return json;
  } catch (error) {
    return error;
  }
}
