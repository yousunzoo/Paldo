import { logInFn } from "./api/requestLogin";

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
    await logInFn(data, router);
  });
}
