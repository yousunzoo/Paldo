import { headers } from "./headers";
import { setUserInfo } from "../localStorage/setIoginData";

export async function logInFn(data) {
  await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login",
    {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    }
  )
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
    });
}
