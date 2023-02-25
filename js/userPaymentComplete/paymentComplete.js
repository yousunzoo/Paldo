export default function () {
  const queryString = window.location.search.slice(1);
  const regex = /([^&=]+)=([^&]*)/g;
  const params = {};
  let match;
  while ((match = regex.exec(queryString)) !== null) {
    params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
  }
  console.log(params)
  const priceEl = document.querySelector('.price');
  priceEl.textContent = `${Number(params.totalPrice).toLocaleString('ko-KR')}원`

  const nameEl = document.querySelector('.name');
  nameEl.textContent = `${params.displayName}님`
}