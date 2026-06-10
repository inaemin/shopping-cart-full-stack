import { createElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import EmptyCartList from ".";

const meta = {
  title: "Components/EmptyCartList",
  component: EmptyCartList,
  decorators: [
    (Story) => createElement("div", { style: { width: 430, height: 640, display: "flex" } }, createElement(Story)),
  ],
} satisfies Meta<typeof EmptyCartList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
