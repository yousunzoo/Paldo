import { SORT_TYPES, getLocalStorageData } from "../localStorage/getLocalStorageData";
import { headers, url } from "../api/headers";

const { ACCESS_TOKEN } = SORT_TYPES;

export default async function () {
  const accessToken = getLocalStorageData(ACCESS_TOKEN);
  try {
    const res = await fetch(`${url}products/transactions/details`, {
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      const errorMessage = await res.json();
      switch (res.status) {
        case 400:
          return []; // 주문 내역이 없는 경우 빈 배열 반환
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
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "일시적인 네트워크 오류가 발생했습니다.",
    });
    return false;
  }
  const json = await res.json();
  return json;
}
