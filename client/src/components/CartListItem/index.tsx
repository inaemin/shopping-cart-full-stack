import { css } from "@emotion/react";
import MinusIcon from "../../assets/minus.svg?react";
import PlusIcon from "../../assets/plus.svg?react";
import { useUpdateCartItemQuantity } from "../../hooks/useUpdateCartItemQuantity";
import type { CartItem } from "../../types/cart";
import Button from "../Button";
import Checkbox from "../Checkbox";

interface CartListItemProps {
  cartItem: CartItem;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
  onQuantityUpdate: (id: number, quantity: number) => Promise<void>;
}

const formatPrice = (price: number) => price.toLocaleString("ko-KR") + "원";

export default function CartListItem({ cartItem, onSelect, onDelete, onQuantityUpdate }: CartListItemProps) {
  const { id, name, imageUrl, price, quantity, isSelected, isAvailable, errorMsg } = cartItem;
  const isPurchaseDisabled = !isAvailable;

  const { isPending, increaseCartItemQuantity, decreaseCartItemQuantity } = useUpdateCartItemQuantity(onQuantityUpdate);

  const handleDecrease = () => decreaseCartItemQuantity(id, quantity);
  const handleIncrease = () => increaseCartItemQuantity(id, quantity);

  return (
    <div css={[containerStyle, isPurchaseDisabled && disabledStyle]}>
      <div css={topRowStyle}>
        <Checkbox checked={isSelected} disabled={isPurchaseDisabled} onChange={() => onSelect(id)} />
        <Button variant="secondary" fit onClick={() => onDelete(id)}>
          삭제
        </Button>
      </div>
      <div css={contentRowStyle}>
        <img css={imageStyle} src={imageUrl} alt={name} />
        <div css={infoStyle}>
          <div css={textGroupStyle}>
            <span className="typo-sm-r">{name}</span>
            <span className="typo-xl-b">{formatPrice(price)}</span>
          </div>
          <div css={quantityRowStyle}>
            <Button variant="icon" onClick={handleDecrease} disabled={quantity === 1 || isPurchaseDisabled}>
              <MinusIcon />
            </Button>
            <span className="typo-sm-r" css={quantityTextStyle}>
              {quantity}
            </span>
            <Button variant="icon" onClick={handleIncrease} disabled={isPending || isPurchaseDisabled}>
              <PlusIcon />
            </Button>
            {errorMsg && (
              <span className="typo-sm-r" css={errorMsgStyle}>
                {errorMsg}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const containerStyle = css`
  padding: 12px 0;
  border-top: 1px solid #e5e5e5;
  opacity: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const topRowStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const contentRowStyle = css`
  display: flex;
  gap: 24px;
`;

const imageStyle = css`
  width: 112px;
  height: 112px;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
  flex-shrink: 0;
`;

const infoStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const textGroupStyle = css`
  display: flex;
  flex-direction: column;
`;

const quantityRowStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  height: 32px;
`;

const quantityTextStyle = css`
  min-width: 20px;
  text-align: center;
`;

const disabledStyle = css`
  opacity: 0.4;
`;

const errorMsgStyle = css`
  color: #e84040;
`;
