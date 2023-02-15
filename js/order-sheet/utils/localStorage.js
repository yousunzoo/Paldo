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
  }

}