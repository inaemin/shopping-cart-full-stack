import { css } from "@emotion/react";
import InfoIcon from "../../assets/info.svg?react";
import { getShippingFeePolicy } from "../../utils/cart";

interface CartOrderSummaryProps {
  orderAmount: number;
  shippingFee: number;
  totalAmount: number;
}

const formatPrice = (price: number) => price.toLocaleString("ko-KR") + "원";

export default function CartOrderSummary({ orderAmount, shippingFee, totalAmount }: CartOrderSummaryProps) {
  return (
    <div css={containerStyle}>
      <div css={policyStyle}>
        <InfoIcon />
        <p className="typo-sm-r">총 주문 금액이 {formatPrice(getShippingFeePolicy())} 이상일 경우 무료 배송됩니다.</p>
      </div>
      <div css={rowGroupStyle}>
        <div css={rowStyle}>
          <span className="typo-md-b">주문 금액</span>
          <span className="typo-xl-b">{formatPrice(orderAmount)}</span>
        </div>
        <div css={rowStyle}>
          <span className="typo-md-b">배송비</span>
          <span className="typo-xl-b">{formatPrice(shippingFee)}</span>
        </div>
      </div>
      <div css={totalRowStyle} data-testid="total-amount">
        <span className="typo-md-b">총 결제 금액</span>
        <span className="typo-xl-b">{formatPrice(totalAmount)}</span>
      </div>
    </div>
  );
}

const containerStyle = css`
  border-top: 1px solid #eee;
`;

const policyStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 0;
`;

const rowGroupStyle = css`
  padding: 12px 0;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const rowStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`;

const totalRowStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;
