import { headers, url } from "./headers";

// 이전 페이지로 이동하는 버튼을 클릭할 때
export default async function loginFn(data) {
  try {
    const res = await fetch(`${url}auth/login`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(res.status);
    }
    const json = await res.json();
    return json;
  } catch (error) {
    return false;
  }
}
