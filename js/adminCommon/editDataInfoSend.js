import { addSwal } from "../adminAddProduct/btnAlert.js";
import { getDetailProduct } from "../api/getDetailProduct";
export const editDataInfoSend = async (callback, id) => {
  const originalData = await getDetailProduct(id);
  let addGoods = {
    title: null,
    price: null,
    description: "0",
    tags: [],
    discountRate: null,
    isSoldOut: false,
  };
  console.log(originalData);
  addGoods.title = document.querySelector(".goods-name").value;
  addGoods.price = Number(document.querySelector(".goods-price").value);
  let tagsArr = document.querySelector(".goods-tag").value.trim();
  addGoods.tags = tagsArr.split(",");
  addGoods.discountRate = Number(document.querySelector(".goods-sale").value);

  let soldOutValue = document.querySelector('input[name="soldout"]:checked').value;
  let isSoldOut = soldOutValue === "inStock" ? false : true;
  addGoods.isSoldOut = isSoldOut;

  const thumbnailInput = document.querySelector(".goods-thumbnail");
  const thumbnailFile = thumbnailInput.files[0];
  const thumbnailReader = new FileReader();
  if (thumbnailFile) {
    thumbnailReader.addEventListener("load", () => {
      addGoods.thumbnailBase64 = thumbnailReader.result;

      const detailInput = document.querySelector(".goods-detail");
      const detailFile = detailInput.files[0];
      const detailReader = new FileReader();

      if (detailFile) {
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
      }
    });
    thumbnailReader.readAsDataURL(thumbnailFile);
  } else {
    addSwal();
    callback(addGoods, id);
  }
};
