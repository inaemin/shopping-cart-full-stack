import { createElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import ErrorList from ".";

const meta = {
  title: "Components/ErrorList",
  component: ErrorList,
  decorators: [
    (Story) => createElement("div", { style: { width: 430, height: 640, display: "flex" } }, createElement(Story)),
  ],
} satisfies Meta<typeof ErrorList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Error: Story = {};
