import { css } from "@emotion/react";
import Button from "../Button";

export default function ErrorList() {
  return (
    <div css={containerStyle}>
      <p className="typo-md-r">오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</p>
      <div css={buttonWrapperStyle}>
        <Button>
          <span className="typo-md-b">다시 시도</span>
        </Button>
      </div>
    </div>
  );
}

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  flex: 1;
`;

const buttonWrapperStyle = css`
  width: 100%;
  height: 56px;
`;
