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
      if (!response.ok) {
        throw new Error(response.status);
      }
      console.log(response);
      return response.json();
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      // 400 에러 시 pw 확인
      Swal.fire({
        icon: "error",
        text: "아이디 및 비밀번호를 확인해주세요!",
      });
      // 401 에러 시 유효한 사용자 X
    });
  history.back();
  return res;
}
