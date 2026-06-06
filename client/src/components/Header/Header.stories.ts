import { createElement } from "react";
import { MemoryRouter } from "react-router";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Header from ".";

const meta = {
  title: "Components/Header",
  component: Header,
  args: {
    children: "SHOP",
  },
  decorators: [
    (Story) =>
      createElement(
        MemoryRouter,
        null,
        createElement("div", { style: { width: 430 } }, createElement(Story)),
      ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Title: Story = {
  args: {
    children: "SHOP",
  },
  render: () => createElement(Header, null, createElement(Header.Title, null, "SHOP")),
};

export const BackButton: Story = {
  args: {
    children: "back",
  },
  render: () => createElement(Header, null, createElement(Header.BackButton)),
};

export const WithBothSides: Story = {
  args: {
    children: "SHOP",
  },
  render: () =>
    createElement(
      Header,
      null,
      createElement(Header.BackButton),
      createElement(Header.Title, null, "SHOP"),
    ),
};
