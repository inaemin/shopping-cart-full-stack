import { css } from "@emotion/react";
import { Navigate, useLocation } from "react-router";
import { ROUTES } from "../constants/routes";
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
    return <Navigate to={ROUTES.CART} replace />;
  }

  const { orderSummary, totalAmount } = state;

  return (
    <div css={pageStyle}>
      <Header>
        <Header.BackButton />
      </Header>
      <main css={mainStyle}>
        <h1 className="typo-xl-b">주문 확인</h1>
        <p className="typo-sm-r">
          총 {orderSummary.cartItemCount}종류의 상품 {orderSummary.totalQuantity}개를 주문합니다.
          <br />
          최종 결제 금액을 확인해 주세요.
        </p>
        <div css={totalGroupStyle}>
          <p className="typo-md-b">총 결제 금액</p>
          <p className="typo-xl-b">{formatPrice(totalAmount)}</p>
        </div>
      </main>
      <footer css={footerStyle}>
        <Button disabled>
          <span className="typo-md-b">결제하기</span>
        </Button>
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
  gap: 24px;
  text-align: center;
`;

const totalGroupStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

const footerStyle = css`
  flex-shrink: 0;
  height: 56px;
`;
