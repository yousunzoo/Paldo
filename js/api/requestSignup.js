import { setUserInfo } from "../localStorage/setLoginData";
import { headers, url } from "./headers";

export async function requestSignup(signupData, userAddress) {
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
    if (error == "Error: 401") {
      Swal.fire({
        icon: "error",
        text: "이미 존재하는 아이디입니다!",
      });
    }
  }
}
