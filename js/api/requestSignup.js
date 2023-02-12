import { setUserInfo } from "../localStorage/setLoginData";
import { headers, url } from "./headers";

export async function requestSignup(signupData, userAddress) {
  await fetch(`${url}auth/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify(signupData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((result) => {
      setUserInfo(result, signupData.email, userAddress);
      history.back();
    })
    .catch((error) => {
      if (error == "Error: 401") {
        Swal.fire({
          icon: "error",
          text: "이미 존재하는 아이디입니다!",
        });
      }
    });
}
