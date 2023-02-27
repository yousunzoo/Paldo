let timerInterval;
export const addSwal = () => {
  Swal.fire({
    title: "상품을 등록중입니다.",
    html: "<b></b> milliseconds. 조금만 기다려주세요.",
    timer: 1800,
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

export const deleteSwal = (count) => {
  Swal.fire({
    title: `선택한 ${count}개의 상품이 삭제되었습니다.`,
    html: "<b></b> milliseconds. 조금만 기다려주세요.",
    timer: 1800,
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
