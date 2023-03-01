export function swiperAction() {
  const mainbanner = document.querySelector(".main-banner .swiper");
  const productList1 = document.querySelector(".product-list1 .swiper");
  const productList2 = document.querySelector(".product-list2 .swiper");
  const accountListEl = document.querySelector(".account-list.swiper");

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

  new Swiper(productList1, {
    slidesPerView: 4,
    spaceBetween: 18,
    navigation: {
      // 버튼
      nextEl: ".product-list1 .swiper-buttons .swiper-button-next",
      prevEl: ".product-list1 .swiper-buttons .swiper-button-prev",
    },
  });

  new Swiper(productList2, {
    slidesPerView: 4,
    spaceBetween: 18,
    navigation: {
      // 버튼
      nextEl: ".product-list2 .swiper-buttons .swiper-button-next",
      prevEl: ".product-list2 .swiper-buttons .swiper-button-prev",
    },
  });

  new Swiper(accountListEl, {
    slidesPerView: 1,
    rewind: true,
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

export function sidebarAction() {
  new Swiper("#sidebar .swiper-wrap", {
    // Optional parameters
    direction: "vertical",
    slidesPerView: 3,
    spaceBetween: 10,

    // Navigation arrows
    navigation: {
      nextEl: "#sidebar .swiper-button-next",
      prevEl: "#sidebar .swiper-button-prev",
    },
  });
}
