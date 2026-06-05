import { css } from "@emotion/react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fit?: boolean;
  children: ReactNode;
}

export default function Button({ variant = "primary", fit = false, children, ...props }: ButtonProps) {
  return (
    <button css={[baseStyle, variantStyles[variant], fit && fitStyle]} {...props}>
      {children}
    </button>
  );
}

const baseStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: opacity 0.15s;
  width: 100%;
  height: 100%;
  border-radius: 0;
  font-size: 12px;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const variantStyles: Record<Variant, ReturnType<typeof css>> = {
  primary: css`
    background-color: #000;
    color: #fff;
  `,
  secondary: css`
    width: auto;
    background-color: #fff;
    color: #000;
    border: 1px solid #e5e5e5;
  `,
  icon: css`
    background-color: #fff;
    color: #000;
    border: 1px solid #e5e5e5;
    width: 24px;
    height: 24px;
    padding: 2px;
    border-radius: 8px;
  `,
};

const fitStyle = css`
  width: auto;
  border-radius: 4px;
  padding: 4px 8px;
`;
