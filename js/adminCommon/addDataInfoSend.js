import { addSwal } from "../adminAddProduct/btnAlert.js";
export const addDataInfoSend = (callback, id) => {
  let addGoods = {
    title: null,
    price: null,
    description: "0",
    tags: [],
    thumbnailBase64: null,
    photoBase64: null,
    discountRate: null,
  };
  addGoods.title = document.querySelector(".goods-name").value;
  addGoods.price = Number(document.querySelector(".sale-cost").value);

  let tagsArr = document.querySelector(".goods-tag").value.trim();
  addGoods.tags = tagsArr.split(",");
  addGoods.discountRate = Number(document.querySelector(".goods-sale").value);

  const thumbnailInput = document.querySelector(".goods-thumbnail");
  const thumbnailFile = thumbnailInput.files[0];
  const thumbnailReader = new FileReader();

  thumbnailReader.addEventListener("load", () => {
    addGoods.thumbnailBase64 = thumbnailReader.result;

    const detailInput = document.querySelector(".goods-detail");
    const detailFile = detailInput.files[0];
    const detailReader = new FileReader();
    console.log(addGoods);
    detailReader.addEventListener("load", () => {
      addGoods.photoBase64 = detailReader.result;
      Promise.all([thumbnailReader.result, detailReader.result])
        .then(([thumbnailBase64, photoBase64]) => {
          addGoods.thumbnailBase64 = thumbnailBase64;
          addGoods.photoBase64 = photoBase64;
          callback(addGoods, id);
        })
        .then(() => {
          addSwal();
        });
    });

    detailReader.readAsDataURL(detailFile);
  });
  thumbnailReader.readAsDataURL(thumbnailFile);
};
