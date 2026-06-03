# Route

/cart
/order-confirm

---

# interface

## CartItem

{
id: number;
name: string;
imageUrl: string;
price: number;
quantity: number;
isSelected: boolean; // getDefaultItemSelectPolicy(id)
isAvailable: boolean; // 재고가 0인 경우 false
errorMsg?: string;
}

# hooks

## useCartForm

> cartPage에서 호출

### states

- cartList: CartItem[]
- status: loading, success, error

### derived variables

- hasNoCartItem: status.success && cartList.length === 0
- hasCartItem: status.success && cartList.length > 0
- orderAmount: cartList에서 isSelected && price \* quantity
- shippingFee: calculateShippingFee(orderAmount)
- TotalAmount = orderAmount + shippingFee
- isAbleToPurchase: !loading && cartList.length && filter(isSelected && isAvailable).length
- isAllSelected: boolean // cartList.every(item => item.isSelected)

### functions

- deleteCartItem(id): 낙관적 업데이트
- selectCartItem(id)
- toggleSelectAllItem(): 전체선택이 되어있다면 전체 선택해제하고, 전체해제되어있다면 전체선택하고, 일부선택이 되어있다면 전체선택한다.
- handleUpdateCartItemQuantity(id, quantity): cartList 업데이트용. quantity와 errorMsg(가 있다면) 업데이트.
- validateCartForm(): 서버에 있는 최신 재고 상태와, 장바구니 상태와 맞는지 검증.

## useUpdateCartItemQuantity

> CartItem에서 호출

### states

- status: pending, idle, error
- id, quantity

### functions

- increaseCartItemQuantity(id, quantity)
- decreaseCartItemQuantity(id, quantity)

---

# Page

## CartPage

### useCartForm hook

- cartList: CartItem[]
- status: loading, success, error
- derived..
- functions..

### functions

- handleSubmitCart: OrderConfirmPage로 이동. state에 주문서 포함.
  (cartList.length, total quantity, totalAmount)

### views

```
<Header>
    <Header.Title />
    <Header.Button />
</Header>
<main>
    <h1>장바구니</h1>
        {loading && <SkeletonList />}
        {hasError && <ErrorList />}
        {hasNoCartItem && <EmptyCartList />}
        {hasCartItem && <CartList />}
    <Button disabled={!isAbleToPurchase} form-id="cart-form">
        주문 확인
    </Button>
</main>
```

## OrderConfirmPage

### functions

- handleSubmitOrder

### views

```
<Header>
    <Header.Button />
</Header>
<main>
    <summary>
        주문확인
        총 2종류의 상품 4개를 주문합니다.
        최종 결제 금액을 확인해 주세요.
        총 결제 금액
    </summary>
    <Button disabled={true}>
        결제하기
    </Button>
</main>
```

# Components

## SkeletonList

### views

```

```

## EmptyCartList

### views

```
<div>
    장바구니에 담은 상품이 없습니다.
</div>
```

## CartList

### props

- cartList: CartItem[]
- isAllSelected
- selectCartItem
- deleteCartItem
- toggleSelectAllItem
- orderAmount, shippingFee, totalAmount

### views

```
<caption>현재 {cartList.length}종류의 상품이 담겨있습니다.</caption>

<CheckBox checked={isAllSelected} onToggle={toggleSelectAllItem} />
<form id="cart-form">
    {cartList.map((cartItem) => <CartListItem key={cartItem.id} cartItem={cartItem} onSelect={selectCartItem} onDelete={deleteCartItem} onQuantityUpdate={handleUpdateCartItemQuantity} />)}
</form>
<CartOrderSummary orderAmount={orderAmount} shippingFee={shippingFee} totalAmount={totalAmount}/>
```

## CartListItem

> disabled 상태(더이상 구매 불가능)도 하나 있어야 함.

### props

- cartItem: {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  isSelected: boolean; // getDefaultItemSelectPolicy(id)
  isAvailable: boolean; // 재고가 0인 경우 false
  errorMsg?: string;
  }
- onQuantityUpdate: handleUpdateCartItemQuantity가 내려옴
- onSelect
- onDelete

### useUpdateCartItemQuantity hook

- status: {pending, idle, error}
- increaseCartItemQuantity
- decreaseCartItemQuantity

### variables

- isPurchaseDisabled = !cartItem.isAvailable;

### views

```
<div>
    <div>
        <CheckBox checked={isSelected} disabled={isPurchaseDisabled} onToggle={onSelect}/>
        <Button variant="secondary" fit onClick={onDelete}>삭제</Button>
    </div>
    <div>
        <img src={imageUrl} />
        <div>
            <label>{name}</label>
            <span>{price}</span>
            <div>
                <Button variant="icon" onClick={decreaseCartItemQuantity} disabled={quantity === 1 || isPurchaseDisabled}/>
                <span>{quantity}</span>
                <Button variant="icon" onClick={increaseCartItemQuantity} disabled={pending || isPurchaseDisabled} />
            </div>
        </div>
    </div>
</div>
```

## CartOrderSummary

### props

- orderAmount, shippingFee, totalAmount

### views

```
<caption>총 주문 금액이 {getShippingFeePolicy()}원 이상일 경우 무료 배송됩니다.</caption>
주문금액 {orderAmount}
배송비 {shippingFee}
총 결제 금액 {totalAmount}
```

## Checkbox

> 스타일링 필요. size

## Button

- variant가 primary, secondary, icon 필요.
- width는 100%가 기본
- fit option이 있으면 padding 포함해서 auto width

## Typo

- 종류가 24 bold, 12 medium lh 15, 16 bold lh 16
