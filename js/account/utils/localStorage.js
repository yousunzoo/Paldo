export const SORT_TYPES = {
  ACCESS_TOKEN: 'accessToken',
  USER_INFO: 'userInfo',
  CART: 'cart',
  COUPONS: 'coupons',
  WISH: 'wish',
};

export function getDataFromLocalStorage (sort) {
  const loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
  const userData = JSON.parse(localStorage.getItem(loginInfo.loginId));

  switch(sort) {
    case 'accessToken' :
      return loginInfo?.accessToken;

    case 'userInfo' : 
      return userData?.userInfo;

    case 'cart' :
      return userData?.cart;

    case 'coupons' :
      return userData?.coupons;

    case 'wish' :
      return userData?.wish;
  }
}