import { checkAuthorization } from "./api/checkAuthorization";
import { changeHeader } from "./main/changeHeader";

window.onload = async function () {
  const isLogin = await checkAuthorization();

  if (isLogin) {
    changeHeader();
  }
};
