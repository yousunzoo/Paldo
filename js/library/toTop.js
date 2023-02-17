export default function goToTopFn() {
  const toTopEl = document.querySelector("#to-top-button");
  window.addEventListener(
    "scroll",
    function () {
      if (window.scrollY > 600) {
        // 페이지 스크롤 위치가 500px 넘으면 버튼 보이기
        gsap.to(toTopEl, 0.2, {
          opacity: 1,
          y: 0,
        });
      } else {
        // 스크롤 위치가 500이 넘지 않으면 버튼 숨기기
        gsap.to(toTopEl, 0.2, {
          opacity: 0,
          y: 50,
        });
      }
    },
    200
  );
  toTopEl.addEventListener("click", function () {
    // 버튼 클릭시 페이지 최상단으로 이동
    gsap.to(window, 0.5, {
      scrollTo: 0,
    });
  });
}
