import { deleteProduct } from "../api/deleteProduct";
import { getDetailProduct } from "../api/getDetailProduct";

export const renderDetailPage = async (id, router) => {
  const productInfo = await getDetailProduct(id);
  const goodsList = document.querySelector(".all-wrapper");

  goodsList.innerHTML = /* HTML */ `
    <div class="goods-title-wrapper">
      <div class="title-header">
        <div class="title">상품 상세페이지</div>
      </div>
      <div class="button-wrapper">
        <div class="edit">
          <a href="editproduct/${productInfo.id}" class="edit-button">수정</a>
        </div>
        <div class="delete">
          <a class="delete-button" data-navigo>삭제</a>
        </div>
      </div>
    </div>
    <div class="goods-item-wrapper">
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
              <div class="val">${productInfo.price}원</div>
            </div>
            <div class="sale">
              <div class="title">할인율</div>
              <div class="val">${productInfo.discountRate}%</div>
            </div>
            <div class="tag">
              <div class="title">할인가</div>
              <div class="val">${parseInt(productInfo.price * (1 - productInfo.discountRate / 100))}원</div>
            </div>
          </div>
        </div>
        <div class="bar"></div>
        <div class="detail-img">
          <img src="${productInfo.photo}" alt="" />
        </div>
      </div>
    </div>
  `;

  const editButton = document.querySelector(".edit-button");

  editButton.addEventListener("click", function (event) {
    event.preventDefault();
    let targetID = this.getAttribute("href");
    router.navigate(targetID);
  });

  let deleteButton = document.querySelector(".delete-button");
  deleteButton.addEventListener("click", async (event) => {
    await deleteProduct(productInfo.id);
    event.preventDefault();
    router.navigate("/product/");
  });
};
