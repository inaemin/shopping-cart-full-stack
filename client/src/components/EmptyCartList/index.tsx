import { css } from "@emotion/react";

export default function EmptyCartList() {
  return (
    <div css={containerStyle}>
      <p className="typo-md-r">장바구니에 담은 상품이 없습니다.</p>
    </div>
  );
}

const containerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
