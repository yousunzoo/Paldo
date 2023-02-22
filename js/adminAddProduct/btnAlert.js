let timerInterval;
export const addSwal = () => {
  Swal.fire({
    title: "상품을 등록중입니다.",
    html: "<b></b> milliseconds. 조금만 기다려주세요.",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft();
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  });
};
