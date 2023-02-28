import { addSwal } from "../adminAddProduct/btnAlert.js";
export const editDataInfoSend = async (callback, id) => {
  let addproduct = {
    title: null,
    price: null,
    description: "0",
    tags: [],
    discountRate: null,
    isSoldOut: false,
  };
  addproduct.title = document.querySelector(".product-name").value;
  addproduct.price = Number(document.querySelector(".product-price").value);
  let tagsArr = document.querySelector(".product-tag").value.trim();
  addproduct.tags = tagsArr.split(",");
  addproduct.discountRate = Number(document.querySelector(".product-sale").value);

  let soldOutValue = document.querySelector('input[name="soldout"]:checked').value;
  let isSoldOut = soldOutValue === "inStock" ? false : true;
  addproduct.isSoldOut = isSoldOut;

  const thumbnailInput = document.querySelector(".product-thumbnail");
  const thumbnailFile = thumbnailInput.files[0];
  const thumbnailReader = new FileReader();
  if (thumbnailFile) {
    thumbnailReader.addEventListener("load", () => {
      addproduct.thumbnailBase64 = thumbnailReader.result;

      const detailInput = document.querySelector(".product-detail");
      const detailFile = detailInput.files[0];
      const detailReader = new FileReader();

      if (detailFile) {
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
      }
    });
    thumbnailReader.readAsDataURL(thumbnailFile);
  } else {
    addSwal();
    callback(addproduct, id);
  }
};
