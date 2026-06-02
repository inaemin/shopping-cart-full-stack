import { updateCartItemQuantity, deleteCartItem, getCartItems } from "../../../src/services/cart.service.js";
import { reset as resetCart, saveNewItem } from "../../../src/repositories/cart.repository.js";
import { reset as resetProducts, save as saveProduct } from "../../../src/repositories/products.repository.js";

const validProduct = {
  name: "콜라",
  stock: 10,
  imageUrl: "https://example.com/images/cola.png",
  price: 1500,
};

describe("cart.service", () => {
  beforeEach(() => {
    resetCart();
    resetProducts();
  });

  describe("getCartItems", () => {
    it("장바구니 목록을 반환한다.", async () => {
      saveNewItem({ productId: 1, quantity: 2 });
      const items = await getCartItems();
      expect(items).toHaveLength(1);
    });
  });

  describe("updateCartItemQuantity", () => {
    it("유효한 요청이면 SUCCESS를 반환한다.", async () => {
      saveProduct(validProduct);
      saveNewItem({ productId: 1, quantity: 1 });
      const [item] = await getCartItems();
      const result = await updateCartItemQuantity(item.id, 5);
      expect(result).toBe("SUCCESS");
    });

    it("존재하지 않는 장바구니 항목이면 CART_ITEM_NOT_FOUND를 반환한다.", async () => {
      const result = await updateCartItemQuantity(9999, 1);
      expect(result).toBe("CART_ITEM_NOT_FOUND");
    });

    it("장바구니 항목의 상품이 삭제된 경우 PRODUCT_NOT_FOUND를 반환한다.", async () => {
      saveNewItem({ productId: 9999, quantity: 1 });
      const [item] = await getCartItems();
      const result = await updateCartItemQuantity(item.id, 1);
      expect(result).toBe("PRODUCT_NOT_FOUND");
    });

    it("요청 수량이 재고보다 많으면 OUT_OF_STOCK를 반환한다.", async () => {
      saveProduct(validProduct);
      saveNewItem({ productId: 1, quantity: 1 });
      const [item] = await getCartItems();
      const result = await updateCartItemQuantity(item.id, validProduct.stock + 1);
      expect(result).toBe("OUT_OF_STOCK");
    });
  });

  describe("deleteCartItem", () => {
    it("존재하는 항목을 삭제하면 true를 반환한다.", async () => {
      saveNewItem({ productId: 1, quantity: 1 });
      const [item] = await getCartItems();
      const result = await deleteCartItem(item.id);
      expect(result).toBe(true);
    });

    it("존재하지 않는 항목을 삭제하면 false를 반환한다.", async () => {
      const result = await deleteCartItem(9999);
      expect(result).toBe(false);
    });
  });
});
