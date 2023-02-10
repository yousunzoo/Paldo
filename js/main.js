import { checkAuthorization } from "./api/checkAuthorization";
window.onload = async function () {
  const isLogin = await checkAuthorization();
  console.log(isLogin);
};
