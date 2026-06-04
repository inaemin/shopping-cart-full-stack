import { css } from "@emotion/react";
import { Navigate, useLocation } from "react-router";
import Button from "../components/Button";
import Header from "../components/Header";
import type { OrderSummary } from "../types/cart";

interface LocationState {
  orderSummary: OrderSummary;
  totalAmount: number;
}

const formatPrice = (price: number) => price.toLocaleString("ko-KR") + "원";

export default function OrderConfirmPage() {
  const location = useLocation();
  const state = location.state as LocationState | null;

  if (!state?.orderSummary) {
    return <Navigate to="/cart" replace />;
  }

  const { orderSummary, totalAmount } = state;

  return (
    <div css={pageStyle}>
      <Header>
        <Header.BackButton />
      </Header>
      <main css={mainStyle}>
        <h1 css={titleStyle}>주문 확인</h1>
        <p css={descStyle}>
          총 {orderSummary.cartItemCount}종류의 상품 {orderSummary.totalQuantity}개를 주문합니다.
          <br />
          최종 결제 금액을 확인해 주세요.
        </p>
        <p css={totalLabelStyle}>총 결제 금액</p>
        <p css={totalAmountStyle}>{formatPrice(totalAmount)}</p>
      </main>
      <footer css={footerStyle}>
        <Button disabled>결제하기</Button>
      </footer>
    </div>
  );
}

const pageStyle = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const mainStyle = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 32px 24px;
  gap: 12px;
  text-align: center;
`;

const titleStyle = css`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const descStyle = css`
  font-size: 14px;
  color: #555;
  line-height: 1.6;
`;

const totalLabelStyle = css`
  font-size: 14px;
  color: #333;
  margin-top: 16px;
`;

const totalAmountStyle = css`
  font-size: 24px;
  font-weight: 700;
`;

const footerStyle = css`
  flex-shrink: 0;
`;
