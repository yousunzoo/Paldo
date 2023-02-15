const accountListEl = document.querySelector('.account-list.swiper');
new Swiper( accountListEl, {
  slidesPerView: 1,
  rewind:true,
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});