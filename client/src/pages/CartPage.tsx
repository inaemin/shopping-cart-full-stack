import { css } from "@emotion/react";
import { useNavigate } from "react-router";
import { ROUTES } from "../constants/routes";
import Button from "../components/Button";
import CartList from "../components/CartList";
import EmptyCartList from "../components/EmptyCartList";
import ErrorList from "../components/ErrorList";
import Header from "../components/Header";
import SkeletonList from "../components/SkeletonList";
import { useCartList } from "../hooks/useCartList";
import { useCartSubmit } from "../hooks/useCartSubmit";

export default function CartPage() {
  const navigate = useNavigate();
  const {
    cartList,
    isLoading,
    hasError,
    hasNoCartItem,
    hasCartItem,
    isAllSelected,
    isAbleToPurchase,
    getItemSelection,
    selectItem,
    selectAllItem,
    refetch,
  } = useCartList();

  const { submitCart } = useCartSubmit({ refetchCart: refetch, getItemSelection });

  const handleSubmitCart = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const orderSummary = await submitCart();
    if (!orderSummary) return;

    navigate(ROUTES.ORDER_CONFIRM, { state: orderSummary });
  };

  return (
    <div css={pageStyle}>
      <Header>
        <Header.Title>SHOP</Header.Title>
      </Header>
      <main css={mainStyle}>
        <h1 css={titleStyle}>장바구니</h1>
        {isLoading && <SkeletonList />}
        {hasError && <ErrorList onRetry={refetch} />}
        {hasNoCartItem && <EmptyCartList />}
        {hasCartItem && (
          <form id="cart-form" onSubmit={handleSubmitCart} css={formStyle}>
            <CartList
              cartList={cartList}
              isAllSelected={isAllSelected}
              onSelectItem={selectItem}
              onSelectAllItems={selectAllItem}
            />
          </form>
        )}
      </main>
      <footer css={footerStyle}>
        <Button type="submit" form="cart-form" disabled={!isAbleToPurchase}>
          <span className="typo-md-b">주문 확인</span>
        </Button>
      </footer>
    </div>
  );
}

const pageStyle = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const mainStyle = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  padding: 36px 24px;
`;

const titleStyle = css`
  font-size: 24px;
  font-weight: bold;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;

const footerStyle = css`
  flex-shrink: 0;
  height: 56px;
`;
