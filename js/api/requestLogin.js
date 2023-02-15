import Navigo from "navigo";
import { headers, url } from "./headers";
import { setUserInfo } from "../localStorage/setLoginData";

export async function logInFn(data) {
  const res = await fetch(`${url}auth/login`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((result) => {
      setUserInfo(result, data.email);
      history.back();
    })
    .catch(() => {
      Swal.fire({
        icon: "error",
        text: "아이디 및 비밀번호를 확인해주세요!",
      });
      return false;
    });
  return res;
}
