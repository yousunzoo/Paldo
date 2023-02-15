import { deleteProduct } from "../api/deleteProduct";
import { getSingleProduct } from "../api/getSingleProduct";

export const renderSinglePage = async (id) => {
  const productInfo = await getSingleProduct(id);
  const goodsList = document.querySelector(".goods-item-wrapper");

  goodsList.innerHTML = /* HTML */ `
    <div class="goods-info">
      <div class="goods-info-wrapper">
        <div class="goods-thumbnail">
          <img src="${productInfo.thumbnail}" alt="" />
        </div>
        <div class="goods-info-text">
          <div class="category">
            <div class="title">카테고리</div>
            <div class="val">${productInfo.tags}</div>
          </div>
          <div class="name">
            <div class="title">상품명</div>
            <div class="val">${productInfo.title}</div>
          </div>
          <div class="price">
            <div class="title">원가격</div>
            <div class="val">${productInfo.price / (1 - productInfo.discountRate / 100)}원</div>
          </div>
          <div class="sale">
            <div class="title">할인율</div>
            <div class="val">${productInfo.discountRate}%</div>
          </div>
          <div class="tag">
            <div class="title">할인가</div>
            <div class="val">${productInfo.price}원</div>
          </div>
        </div>
      </div>
      <div class="bar"></div>
      <div class="detail-img">
        <img src="${productInfo.photo}" alt="" />
      </div>
    </div>
  `;

  let deleteButton = document.querySelector(".delete-button");
  deleteButton.addEventListener("click", async () => {
    await deleteProduct(productInfo.id);
  });
};
