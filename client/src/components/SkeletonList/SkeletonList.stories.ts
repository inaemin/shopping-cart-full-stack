import { createElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import SkeletonList from ".";

const meta = {
  title: "Components/SkeletonList",
  component: SkeletonList,
  decorators: [
    (Story) => createElement("div", { style: { width: 430, height: 720 } }, createElement(Story)),
  ],
} satisfies Meta<typeof SkeletonList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {};
