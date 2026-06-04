import { css } from "@emotion/react";
import { Outlet } from "react-router";

export default function MobileLayout() {
  return (
    <div css={wrapperStyle}>
      <div css={mockupStyle}>
        <Outlet />
      </div>
    </div>
  );
}

const wrapperStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
`;

const mockupStyle = css`
  width: 430px;
  height: 936px;
  border-radius: 24px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.18);
  background-color: #fff;
  overflow: hidden;
  position: relative;
`;
