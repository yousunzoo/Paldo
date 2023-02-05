const mainbanner = document.querySelector(".main__banner .swiper");
const prdList1 = document.querySelector(".prd-list1 .swiper");

new Swiper(mainbanner, {
  slidesPerView: 1,
  autoplay: true,
  loop: true,
  navigation: {
    // 버튼
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

new Swiper(prdList1, {
  slidesPerView: 4,
  spaceBetween: 18,
});
