import { createElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import CartListItem from ".";
import type { CartItem } from "../../types/cart";

const selectedItem: CartItem = {
  id: 1,
  name: "상품 A",
  imageUrl: "https://placehold.co/112x112",
  price: 35000,
  quantity: 2,
  isSelected: true,
  isAvailable: true,
};

const onSelect = () => undefined;
const onDelete = () => undefined;
const onQuantityUpdate = async () => undefined;

const meta = {
  title: "Components/CartListItem",
  component: CartListItem,
  args: {
    cartItem: selectedItem,
    onSelect,
    onDelete,
    onQuantityUpdate,
  },
  decorators: [
    (Story) => createElement("div", { style: { width: 430 } }, createElement(Story)),
  ],
} satisfies Meta<typeof CartListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () =>
    createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 8 } },
      createElement(CartListItem, {
        cartItem: selectedItem,
        onSelect,
        onDelete,
        onQuantityUpdate,
      }),
      createElement(CartListItem, {
        cartItem: { ...selectedItem, id: 2, name: "선택하지 않은 상품", isSelected: false },
        onSelect,
        onDelete,
        onQuantityUpdate,
      }),
      createElement(CartListItem, {
        cartItem: { ...selectedItem, id: 3, name: "구매 불가능한 상품", isAvailable: false, errorMsg: "더 이상 구매할 수 없는 상품입니다." },
        onSelect,
        onDelete,
        onQuantityUpdate,
      }),
      createElement(CartListItem, {
        cartItem: { ...selectedItem, id: 4, name: "수량 에러 상품", errorMsg: "요청한 수량이 현재 재고보다 많습니다." },
        onSelect,
        onDelete,
        onQuantityUpdate,
      }),
    ),
};

export const Selected: Story = {};

export const Unselected: Story = {
  args: {
    cartItem: { ...selectedItem, isSelected: false },
  },
};

export const Unavailable: Story = {
  args: {
    cartItem: { ...selectedItem, isAvailable: false, errorMsg: "더 이상 구매할 수 없는 상품입니다." },
  },
};

export const QuantityError: Story = {
  args: {
    cartItem: { ...selectedItem, errorMsg: "요청한 수량이 현재 재고보다 많습니다." },
  },
};
