import { headers, url } from "./headers";

export const detailTransaction = async (payload, id) => {
  const { isCanceled, done } = payload;
  const res = await fetch(`${url}products/transactions/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      isCanceled,
      done,
    }),
  });
  const result = await res.json();
};
