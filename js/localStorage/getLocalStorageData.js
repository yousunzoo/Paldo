export const SORT_TYPES = {
  ACCESS_TOKEN: "accessToken",
  USER_INFO: "userInfo",
  USER_ADDRESS: "userAddress",
  CART_LIST: "cartList",
  COUPONS: "coupons",
  WISH_LIST: "wishList",
  USER_DATA: "userData",
};

export function getLocalStorageData(sort) {
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const userData = JSON.parse(localStorage.getItem(loginInfo?.loginId));
  const sidebarData = JSON.parse(localStorage.getItem("sidebarData"));
  switch (sort) {
    case "sidebarData":
      return sidebarData || [];
    case "loginInfo":
      return loginInfo || null;
    case "loginId":
      return loginInfo?.loginId;
    case "loginIdData":
      return userData;
    case "accessToken":
      return loginInfo?.accessToken;

    case "userInfo":
      return userData?.userInfo;

    case "userAddress":
      return userData?.userAddress;

    case "cartList":
      return userData?.cartList;

    case "coupons":
      return userData?.coupons;

    case "wishList":
      return userData?.wishList;
    case "userData":
      return userData;
  }
}
