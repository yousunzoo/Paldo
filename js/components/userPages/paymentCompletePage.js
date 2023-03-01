export default /* html */ `
  <div class="payment-wrapper">
    <div class="icon">
      <img src="${require("../../../static/images/pay-check.png")}" alt="결제완료" />
    </div>
    <div class="order-desc">
      <div class="text"><span class="name"></span>의 주문이 완료되었습니다.</div>
      <div>내일 아침에 만나요!</div>
    </div>
    <div class="bar"></div>

    <div class="pay-price">
      <div class="title">결제금액</div>
      <div class="price"></div>
    </div>
    <div class="takeout">
      <div class="desc">
        <div class="first-desc">종이 포장재, 팔도가 회수해드려요.</div>
        <div class="second-desc">다음 주문 시, 문앞에 놓아주세요.</div>
      </div>
      <div class="logo">
        <img src="${require("../../../static/images/team_logo.png")}" alt="" />
      </div>
    </div>
    <div class="desc">
      <p>· [주문완료] 상태일 경우에만 주문내역 상세페이지에서 주문 취소가 가능합니다.</p>
      <p>· 엘리베이터 이용이 어려운 경우 6층 이상부터는 공동 현관 앞 또는 경비실로 대응 배송 될 수 있습니다.</p>
      <p>· 주문 / 배송 및 기타 문의가 있을 경우, 1:1 문의에 남겨주시면 신속히 해결해드리겠습니다.</p>
    </div>
    <a href="/mypage/orderList" data-navigo>
      <button class="order-button">주문내역 가기</button>
    </a>
    <a href="/" data-navigo>
      <button class="shop-button">쇼핑 계속하기</button>
    </a>
  </div>
`;
