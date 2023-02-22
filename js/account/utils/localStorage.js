export const SORT_TYPES = {
  ACCESS_TOKEN: 'accessToken',
  USER_INFO: 'userInfo',
  USER_ADDRESS: 'userAddress',
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

    case 'userAddress' :
      return userData?.userAddress;
      
    case 'cart' :
      return userData?.cart;
    
    case 'coupons' :
      return userData?.coupons;

    case 'wish' :
      return userData?.wish;
  }
}