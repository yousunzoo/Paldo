import { headers } from "./headers";

const url = "https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/all";

export const memoizedGetTransactions = (() => {
  let product;
  return async () => {
    if (!product) {
      product = await getTransactions();
    }
    return product;
  };
})();
import { openDB } from "idb";

const DB_NAME = "transactionDB";
const STORE_NAME = "transactions";

export const getTransactions = async () => {
  try {
    // Try to retrieve the transactions from the indexedDB
    const db = await openDB(DB_NAME, 2);
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const transactions = await store.getAll();
    db.close();

    // If there are transactions in the indexedDB, return them
    if (transactions.length > 0) {
      return transactions;
    }

    // Otherwise, send an HTTP request to retrieve the transactions
    const res = await fetch(url, {
      method: "GET",
      headers,
    });
    const newTransactions = await res.json();

    // Save the new transactions to the indexedDB
    const db2 = await openDB(DB_NAME, 2);
    const tx2 = db2.transaction(STORE_NAME, "readwrite");
    const store2 = tx2.objectStore(STORE_NAME);
    newTransactions.forEach((transaction) => {
      store2.put(transaction);
    });
    await tx2.complete;
    db2.close();

    // Return the new transactions
    return newTransactions;
  } catch (error) {
    console.error(error);
  }
};

setInterval(async () => {
  try {
    // Retrieve the latest transactions from the server
    const res = await fetch(url, {
      method: "GET",
      headers,
    });
    const newTransactions = await res.json();

    // Open the indexedDB and update it with any new transactions
    const db = await openDB(DB_NAME, 2);
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    newTransactions.forEach((transaction) => {
      store.put(transaction);
    });
    await tx.complete;
    db.close();
  } catch (error) {
    console.error(error);
  }
}, 30000);
