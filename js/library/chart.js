import { productCount, transactionsCount } from "../adminFunctions/adminReport/getCountData";

export const chartFn = async (barCountArr, pieCountArr) => {
  const bar = document.getElementById("bar-chart").getContext("2d");
  Chart.defaults.font.size = 11;
  const barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: ["전체상품", "스낵", "라면", "음료", "초콜릿/캔디류", "인기", "신상", "세일"],
      datasets: [
        {
          label: "현재 제품 수량",
          data: [12, 50, 70, 80, 25, 60, 50, 20],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(100, 119, 64, 0.2)",
            "rgba(210, 119, 50, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(120, 119, 64, 1)",
            "rgba(210, 119, 50, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
  });
  barChart.config._config.data.datasets[0].data = await barCountArr;
  barChart.update();
  const pie = document.getElementById("pie-chart").getContext("2d");
  const pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: ["전체상품", "스낵", "라면", "음료", "초콜릿/캔디류", "인기", "신상", "세일"],
      datasets: [
        {
          label: "현재판매 수량",
          data: [1, 2, 3, 4, 3, 2, 4, 2],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(100, 119, 64, 0.2)",
            "rgba(210, 119, 50, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(120, 119, 64, 1)",
            "rgba(120, 119, 64, 1)",
            "rgba(210, 119, 50, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  pieChart.config._config.data.datasets[0].data = await pieCountArr;
  pieChart.update();
  const loader = document.querySelector(".loader-wrapper");
  loader.style.display = "none";
};
