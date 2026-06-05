import { css } from "@emotion/react";
import type { InputHTMLAttributes, ReactNode } from "react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: number;
  children?: ReactNode;
}

export default function Checkbox({
  checked,
  disabled = false,
  onChange,
  size = 24,
  children,
  ...props
}: CheckboxProps) {
  return (
    <label css={wrapperStyle}>
      <input
        type="checkbox"
        css={[
          inputStyle,
          css`
            width: ${size}px;
            height: ${size}px;
          `,
        ]}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...props}
      />
      {children}
    </label>
  );
}

const wrapperStyle = css`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
`;

const inputStyle = css`
  appearance: none;
  border: 1.5px solid #e5e5e5;
  border-radius: 7px;
  background-color: #fff;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;

  &:checked {
    background-color: #000;
    border-color: #000;
  }

  &:checked::after {
    content: "";
    position: absolute;
    inset: 0;
    margin: auto;
    width: 30%;
    height: 65%;
    border: 2px solid #fff;
    border-top: none;
    border-left: none;
    transform: rotate(45deg) translate(-10%, -10%);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
