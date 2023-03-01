// 제품 필터링 ( 검색, 카테고리, 품절여부)
let arr;
let isRendered = false;

export const productFilterList = (listEls, search) => {
  let totalCount;
  let res = { arr, totalCount };
  let boolean = ["YES", "NO"];
  let tagList = ["초콜릿/캔디류", "라면", "음료", "스낵", "인기", "세일", "신상"];
  if (tagList.includes(search)) {
    res.arr = filterByTag(listEls, search);
    res.totalCount = res.arr.length * 10;
    return res;
  } else if (boolean.includes(search)) {
    res.arr = filterByBoolean(listEls, search);
    res.totalCount = res.arr.length * 10;
    return res;
  } else if (search === undefined) {
    res.arr = filterAll(listEls);
    res.totalCount = listEls.length;
    return res;
  } else {
    res.arr = filterBySearch(listEls, search);
    if (res.arr === undefined) return;
    res.totalCount = res.arr.length * 10;
    return res;
  }
};

// 카테고리 필터링
const filterByTag = (listEls, search) => {
  const searchFilters = listEls.filter((item) => item.tags.includes(search));
  const arr = Array(Math.ceil(searchFilters.length / 10)).fill([]);
  let num = 0;
  for (let i in arr) {
    arr[i] = searchFilters.slice(num, num + 10);
    num += 10;
    isRendered = false;
  }
  return arr;
};

// 품절여부 필터링
const filterByBoolean = (listEls, search) => {
  let yesOrNo;
  if (search === "YES") {
    yesOrNo = true;
  } else {
    yesOrNo = false;
  }
  const searchFilters = listEls.filter((item) => item.isSoldOut === yesOrNo);
  const arr = Array(Math.ceil(searchFilters.length / 10)).fill([]);
  let num = 0;
  for (let i in arr) {
    arr[i] = searchFilters.slice(num, num + 10);
    num += 10;
    isRendered = false;
  }
  return arr;
};
// 검색어 필터링
const filterBySearch = (listEls, search) => {
  isRendered = false;
  const searchFilters = listEls.filter((item) => item.title.includes(search));
  const arr = Array(Math.ceil(searchFilters.length / 10)).fill([]);
  if (searchFilters.length === 0 || searchFilters.length === undefined) {
    Swal.fire({
      icon: "error",
      title: "검색어를 확인해주세요.",
      text: "검색한 제품명은 찾을 수 없습니다.",
    });
    return;
  }
  let num = 0;
  for (let i in arr) {
    arr[i] = searchFilters.slice(num, num + 10);
    num += 10;
  }
  return arr;
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
