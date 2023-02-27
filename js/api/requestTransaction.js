import { SORT_TYPES, getLocalStorageData } from "../localStorage/getLocalStorageData";
import { headers, url } from "./headers";

const { ACCESS_TOKEN } = SORT_TYPES;

export default function (body) {
  return new Promise(async (resolve, reject) => {
    const accessToken = getLocalStorageData(ACCESS_TOKEN);
    try {
      const res = await fetch(`${url}products/buy`, {
        method: "POST",
        headers: {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        resolve(res);
      } else {
        throw new Error(res.status);
      }
    } catch (error) {
      reject(error);
    }
  });
}
