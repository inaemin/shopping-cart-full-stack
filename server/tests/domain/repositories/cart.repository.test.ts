import {
  saveNewItem,
  findAll,
  findProductIdById,
  updateItemQuantity,
  deleteById,
  deleteByProductId,
  isAlreadyExist,
  reset,
} from "../../../src/repositories/cart.repository.js";

describe("cart.repository", () => {
  beforeEach(() => {
    reset();
  });

  describe("saveNewItem", () => {
    it("장바구니 항목을 저장하면 id가 자동 부여된다.", () => {
      saveNewItem({ productId: 1, quantity: 2 });
      const items = findAll();
      expect(items[0].id).toBe(1);
    });

    it("장바구니 항목을 여러 개 저장하면 id가 순차적으로 부여된다.", () => {
      saveNewItem({ productId: 1, quantity: 1 });
      saveNewItem({ productId: 2, quantity: 2 });
      const items = findAll();
      expect(items[0].id).toBe(1);
      expect(items[1].id).toBe(2);
    });
  });

  describe("findAll", () => {
    it("저장된 항목이 없으면 빈 배열을 반환한다.", () => {
      expect(findAll()).toEqual([]);
    });

    it("저장된 항목을 모두 반환한다.", () => {
      saveNewItem({ productId: 1, quantity: 1 });
      expect(findAll()).toHaveLength(1);
    });
  });

  describe("findProductIdById", () => {
    it("존재하는 장바구니 항목의 productId를 반환한다.", () => {
      saveNewItem({ productId: 42, quantity: 1 });
      const [item] = findAll();
      expect(findProductIdById(item.id)).toBe(42);
    });

    it("존재하지 않는 항목이면 -1을 반환한다.", () => {
      expect(findProductIdById(9999)).toBe(-1);
    });
  });

  describe("isAlreadyExist", () => {
    it("존재하는 항목이면 true를 반환한다.", () => {
      saveNewItem({ productId: 1, quantity: 1 });
      const [item] = findAll();
      expect(isAlreadyExist(item.id)).toBe(true);
    });

    it("존재하지 않는 항목이면 false를 반환한다.", () => {
      expect(isAlreadyExist(9999)).toBe(false);
    });
  });

  describe("updateItemQuantity", () => {
    it("장바구니 항목의 수량을 새 값으로 교체한다.", () => {
      saveNewItem({ productId: 1, quantity: 1 });
      const [item] = findAll();
      updateItemQuantity(item.id, 3);
      expect(findAll()[0].quantity).toBe(3);
    });
  });

  describe("deleteById", () => {
    it("존재하는 항목을 삭제하면 true를 반환하고 항목이 제거된다.", () => {
      saveNewItem({ productId: 1, quantity: 1 });
      const [item] = findAll();
      expect(deleteById(item.id)).toBe(true);
      expect(findAll()).toHaveLength(0);
    });

    it("존재하지 않는 항목을 삭제하면 다른 항목이 삭제되지 않는다.", () => {
      saveNewItem({ productId: 1, quantity: 1 });
      deleteById(9999);
      expect(findAll()).toHaveLength(1);
    });
  });

  describe("deleteByProductId", () => {
    it("해당 productId를 가진 항목이 삭제된다.", () => {
      saveNewItem({ productId: 1, quantity: 1 });
      deleteByProductId(1);
      expect(findAll()).toHaveLength(0);
    });

    it("존재하지 않는 productId면 다른 항목이 삭제되지 않는다.", () => {
      saveNewItem({ productId: 1, quantity: 1 });
      deleteByProductId(9999);
      expect(findAll()).toHaveLength(1);
    });
  });
});
