export default function handleSearchInput(router) {
  const searchForm = document.querySelector("form.search");
  // searchForm 제출 시 페이지 이동
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const keyword = searchForm.querySelector("input").value;
    if (!keyword) return;
    router.navigate(`search/${keyword}`);
  });
}
