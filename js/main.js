import { checkAuthorization } from "./api/checkAuthorization";
import { changeHeader } from "./main/changeHeader";

document.addEventListener("DOMContentLoaded", async () => {
  const isLogin = await checkAuthorization();

  if (isLogin) {
    changeHeader();
  }
});
