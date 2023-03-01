import { headers, url } from "./headers";
import { SORT_TYPES, getLocalStorageData } from "../utils/localStorage/getLocalStorageData";

const { ACCESS_TOKEN } = SORT_TYPES;

export async function requestPersonalInfoModify(newData) {
  const accessToken = getLocalStorageData(ACCESS_TOKEN);
  try {
    const res = await fetch(`${url}auth/user`, {
      method: "PUT",
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(newData),
    });
    if (!res.ok) {
      const errorMessage = await res.json();
      switch (res.status) {
        case 400:
          Swal.fire({
            icon: "error",
            title: errorMessage,
          });
          break;
        case 401:
          Swal.fire({
            icon: "error",
            title: errorMessage,
            text: "재로그인 후 다시 시도해주세요.",
          });
          break;
        default:
          Swal.fire({
            icon: "error",
            title: "Oops..",
            text: "알 수 없는 오류가 발생했습니다.",
          });
      }
      return false;
    }
    const json = await res.json();
    return json;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "일시적인 네트워크 오류가 발생했습니다.",
    });
    return false;
  }
}
