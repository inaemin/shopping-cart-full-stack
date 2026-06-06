import { createElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Checkbox from ".";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  args: {
    children: "전체선택",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () =>
    createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 12 } },
      createElement(Checkbox, null, "unchecked"),
      createElement(Checkbox, { checked: true }, "checked"),
      createElement(Checkbox, { checked: true, disabled: true }, "disabled"),
    ),
};

export const Unchecked: Story = {};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};
