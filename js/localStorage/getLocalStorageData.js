export const SORT_TYPES = {
  ACCESS_TOKEN: 'accessToken',
  USER_INFO: 'userInfo',
  USER_ADDRESS: 'userAddress',
  CART_LIST: 'cartList',
  COUPONS: 'coupons',
  WISH_LIST: 'wishList',
  USER_DATA: 'userData'
};

export function getLocalStorageData (sort) {
  const loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
  const userData = JSON.parse(localStorage.getItem(loginInfo.loginId));

  switch(sort) {
    case 'accessToken' :
      return loginInfo?.accessToken;

    case 'userInfo' : 
      return userData?.userInfo;

    case 'userAddress' :
      return userData?.userAddress;
      
    case 'cartList' :
      return userData?.cartList;

    case 'coupons' :
      return userData?.coupons;

    case 'wishList' :
      return userData?.wishList;
    case 'userData' :
      return userData;
  }
}