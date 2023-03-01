// 제품 필터링 ( 검색, 카테고리, 품절여부)
let arr;
let isRendered = false;

export const transctionFilterList = (listEls, search) => {
  // 시간순으로 정렬
  listEls.sort((a, b) => {
    return new Date(b.timePaid) - new Date(a.timePaid);
  });
  let totalCount;
  let res = { arr, totalCount };
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (search === undefined) {
    res.arr = filterAll(listEls);
    res.totalCount = listEls.length;
    return res;
  } else if (regex.test(search)) {
    res.arr = filterByDate(listEls, search);
    // 거래 날짜가 없으면 종료
    if (res.arr === undefined) return;
    res.totalCount = res.arr.length * 10;
    return res;
  } else {
    res.arr = filterBySearch(listEls, search);
    // 구매자명이 없으면 종료
    if (res.arr === undefined) return;
    res.totalCount = res.arr.length * 10;
    return res;
  }
};

// 전체목록
const filterAll = (listEls) => {
  const arr = Array(Math.ceil(listEls.length / 10)).fill([]);
  let num = 0;
  for (let i in arr) {
    arr[i] = listEls.slice(num, num + 10);
    num += 10;
  }
  return arr;
};

// 검색어 정렬
const filterBySearch = (listEls, search) => {
  isRendered = false;
  const searchFilters = listEls.filter((item) => item.user.displayName.includes(search));
  if (searchFilters.length === 0 || searchFilters.length === []) {
    Swal.fire({
      icon: "error",
      title: "구매자명을 확인해주세요.",
      text: "검색한 구매자명은 기록이 없습니다.",
    });
    return;
  }

  const arr = Array(Math.ceil(searchFilters.length / 10)).fill([]);
  let num = 0;
  for (let i in arr) {
    arr[i] = searchFilters.slice(num, num + 10);
    num += 10;
  }
  return arr;
};

// flatfickr 거래날짜 정렬
const filterByDate = (listEls, search) => {
  isRendered = false;
  const searchFilters = listEls.filter((item) => {
    const kstOffset = 9 * 60;
    const kstDate = new Date(new Date(item.timePaid).getTime() + kstOffset * 60 * 1000);
    const krDate = kstDate.toISOString().slice(0, 10);
    if (krDate === search) {
      return item;
    }
  });
  if (searchFilters.length === 0) {
    Swal.fire({
      icon: "error",
      title: "거래날짜를 확인해주세요.",
      text: "선택된 날짜에는 거래한 기록이 없습니다.",
    });
    return;
  }
  const arr = Array(Math.ceil(searchFilters.length / 10)).fill([]);
  let num = 0;
  for (let i in arr) {
    arr[i] = searchFilters.slice(num, num + 10);
    num += 10;
  }
  return arr;
};
