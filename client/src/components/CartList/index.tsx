import { css } from "@emotion/react";
import type { CartItem } from "../../types/cart";
import CartOrderSummary from "../CartOrderSummary";
import Checkbox from "../Checkbox";
import CartListItem from "../CartListItem";

interface CartListProps {
  cartList: CartItem[];
  isAllSelected: boolean;
  orderAmount: number;
  shippingFee: number;
  totalAmount: number;
  onDelete: (id: number) => void;
  onSelectItem: (id: number) => void;
  onSelectAllItems: () => void;
  onQuantityUpdate: (id: number, quantity: number) => Promise<void>;
}

export default function CartList({
  cartList,
  isAllSelected,
  orderAmount,
  shippingFee,
  totalAmount,
  onDelete,
  onSelectItem,
  onSelectAllItems,
  onQuantityUpdate,
}: CartListProps) {
  return (
    <div css={containerStyle}>
      <div css={captionStyle}>
        <p className="typo-sm-r">현재 {cartList.length}종류의 상품이 담겨있습니다.</p>
      </div>
      <div css={selectAllRowStyle}>
        <Checkbox checked={isAllSelected} onChange={onSelectAllItems}>
          <span className="typo-sm-r">전체선택</span>
        </Checkbox>
      </div>
      <div css={scrollableStyle}>
        <div css={itemListStyle}>
          {cartList.map((cartItem) => (
            <CartListItem
              key={cartItem.id}
              cartItem={cartItem}
              onSelect={onSelectItem}
              onDelete={onDelete}
              onQuantityUpdate={onQuantityUpdate}
            />
          ))}
        </div>
        <CartOrderSummary orderAmount={orderAmount} shippingFee={shippingFee} totalAmount={totalAmount} />
      </div>
    </div>
  );
}

const containerStyle = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;

const captionStyle = css`
  padding: 12px 0;
`;

const selectAllRowStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 20px 0;
`;

const scrollableStyle = css`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const itemListStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
