import { addSwal } from "../adminAddProduct/btnAlert";

export const addDataInfoSend = (callback, id) => {
  let addproduct = {
    title: null,
    price: null,
    description: "0",
    tags: [],
    thumbnailBase64: null,
    photoBase64: null,
    discountRate: null,
  };
  addproduct.title = document.querySelector(".product-name").value;
  addproduct.price = Number(document.querySelector(".sale-cost").value);

  let tagsArr = document.querySelector(".product-tag").value.trim();
  addproduct.tags = tagsArr.split(",");
  addproduct.discountRate = Number(document.querySelector(".product-sale").value);

  const thumbnailInput = document.querySelector(".product-thumbnail");
  const thumbnailFile = thumbnailInput.files[0];
  const thumbnailReader = new FileReader();

  thumbnailReader.addEventListener("load", () => {
    addproduct.thumbnailBase64 = thumbnailReader.result;

    const detailInput = document.querySelector(".product-detail");
    const detailFile = detailInput.files[0];
    const detailReader = new FileReader();
    detailReader.addEventListener("load", () => {
      addproduct.photoBase64 = detailReader.result;
      Promise.all([thumbnailReader.result, detailReader.result])
        .then(([thumbnailBase64, photoBase64]) => {
          addproduct.thumbnailBase64 = thumbnailBase64;
          addproduct.photoBase64 = photoBase64;
          callback(addproduct, id);
        })
        .then(() => {
          addSwal();
        });
    });

    detailReader.readAsDataURL(detailFile);
  });
  thumbnailReader.readAsDataURL(thumbnailFile);
};
