import { createElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import MinusIcon from "../../assets/minus.svg?react";
import PlusIcon from "../../assets/plus.svg?react";
import Button from ".";

const meta = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "주문 확인",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () =>
    createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 12, width: 240 } },
      createElement(
        "div",
        { style: { height: 56 } },
        createElement(Button, null, createElement("span", { className: "typo-md-r" }, "primary")),
      ),
      createElement(
        "div",
        null,
        createElement(
          Button,
          { variant: "secondary", fit: true, children: createElement("span", { className: "typo-md-r" }, "secondary") },
        ),
      ),
      createElement(
        "div",
        { style: { width: 24 } },
        createElement(Button, { variant: "icon", children: createElement(PlusIcon) }),
      ),
      createElement(
        "div",
        { style: { width: 24 } },
        createElement(Button, { variant: "icon", children: createElement(MinusIcon) }),
      ),
      createElement(
        "div",
        { style: { height: 56 } },
        createElement(Button, { disabled: true, children: createElement("span", { className: "typo-md-r" }, "disabled") }),
      ),
    ),
};

export const Primary: Story = {
  render: () =>
    createElement(
      "div",
      { style: { width: 240, height: 56 } },
      createElement(Button, null, createElement("span", { className: "typo-md-r" }, "주문 확인")),
    ),
};

export const Secondary: Story = {
  render: () =>
    createElement(
      "div",
      null,
      createElement(Button, { variant: "secondary", fit: true, children: createElement("span", { className: "typo-md-r" }, "삭제") }),
    ),
};

export const Icon: Story = {
  render: () =>
    createElement(
      "div",
      { style: { width: 24 } },
      createElement(Button, { variant: "icon", children: createElement(PlusIcon) }),
    ),
};

export const Disabled: Story = {
  render: () =>
    createElement(
      "div",
      { style: { width: 240, height: 56 } },
      createElement(Button, { disabled: true, children: createElement("span", { className: "typo-md-r" }, "결제하기") }),
    ),
};
