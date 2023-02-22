import { headers, url } from "./headers";
import { SORT_TYPES, getDataFromLocalStorage } from '../personal-info-modify/utils/localStorage';

const { ACCESS_TOKEN } = SORT_TYPES;

export async function requestPersonalInfoModify(newData, userAddress) {
  const accessToken = getDataFromLocalStorage(ACCESS_TOKEN);
  await fetch(`${url}auth/user`, {
    method: 'PUT',
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(newData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((result) => {
      Swal.fire(
        '수정 성공!',
        '개인 정보가 수정되었습니다.',
        'success'
      )
      // localStorage 세팅
      localStorage.setItem(
        result.email,
        JSON.stringify({ userInfo: result, userAddress })
      );
    })
    .catch((error) => {
      if (error == "Error: 401") {
        Swal.fire({
          icon: "error",
          text: "요청이 실패했습니다!",
        });
      }
    });
}
