import { headers } from "./headers";

export const detailTransaction = async (payload, id) => {
  const { isCanceled, done } = payload;
  const res = await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      isCanceled,
      done,
    }),
  });
  const result = await res.json();
};
