const accountListEl = document.querySelector('.account-list.swiper');
const swiper = new Swiper( accountListEl, {
  slidesPerView: 1,
  loop : true,
  pagination: {
    el: '.swiper-pagination',
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});