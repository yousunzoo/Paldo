import { loginFn } from "./api/requestLogin";
import { setUserInfo } from "./localStorage/setLoginData";
import { changeHeader } from "./main/changeHeader";

export default function loginEvent(router) {
  const loginForm = document.querySelector(".login-form");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = event.target["email"].value;
    const password = event.target["pw"].value;
    const data = {
      email,
      password,
    };
    const result = await loginFn(data);
    if (result) {
      setUserInfo(result, email);
      router.navigate("/");
    } else {
      Swal.fire({
        icon: "error",
        text: "아이디 및 비밀번호를 확인해주세요!",
      });
    }
  });
}
