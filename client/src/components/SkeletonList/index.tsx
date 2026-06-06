import { css, keyframes } from "@emotion/react";

export default function SkeletonList() {
  return (
    <div css={containerStyle} data-testid="skeleton-list">
      <div css={sectionStyle}>
        <div css={bar(15)} />
      </div>

      <div css={bar(24)} />
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} css={sectionStyle}>
          <div css={bar(160)} />
        </div>
      ))}

      <div css={sectionStyle}>
        <div css={bar(16)} />
        <div css={bar(92)} />
        <div css={bar(42)} />
      </div>
    </div>
  );
}

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const skeletonBase = css`
  background: linear-gradient(90deg, #ddd 25%, #eee 50%, #ddd 75%);
  background-size: 800px 100%;
  animation: ${shimmer} 1.4s infinite linear;
  border-radius: 4px;
`;

const containerStyle = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 24px;
  margin-top: 12px;
`;

const sectionStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-bottom: 1px solid #eee;
`;

const bar = (height: number) => css`
  ${skeletonBase};
  width: 100%;
  height: ${height}px;
`;
