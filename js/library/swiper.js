const mainbanner = document.querySelector(".main__banner .swiper");

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
