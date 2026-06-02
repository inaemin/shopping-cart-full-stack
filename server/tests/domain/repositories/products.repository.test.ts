import {
  save,
  findAll,
  findStockById,
  deleteById,
  isAlreadyExist,
  reset,
} from "../../../src/repositories/products.repository.js";

const validProduct = {
  name: "콜라",
  stock: 10,
  imageUrl: "https://example.com/images/cola.png",
  price: 1500,
};

describe("products.repository", () => {
  beforeEach(() => {
    reset();
  });

  describe("save", () => {
    it("상품을 저장하면 id가 자동 부여된다.", () => {
      save(validProduct);
      const products = findAll();
      expect(products[0].id).toBe(1);
    });

    it("상품을 여러 개 저장하면 id가 순차적으로 부여된다.", () => {
      save(validProduct);
      save(validProduct);
      const products = findAll();
      expect(products[0].id).toBe(1);
      expect(products[1].id).toBe(2);
    });
  });

  describe("findAll", () => {
    it("저장된 상품이 없으면 빈 배열을 반환한다.", () => {
      expect(findAll()).toEqual([]);
    });

    it("저장된 상품을 모두 반환한다.", () => {
      save(validProduct);
      expect(findAll()).toHaveLength(1);
    });
  });

  describe("findStockById", () => {
    it("존재하는 상품의 재고를 반환한다.", () => {
      save(validProduct);
      const [product] = findAll();
      expect(findStockById(product.id)).toBe(validProduct.stock);
    });

    it("존재하지 않는 상품이면 -1을 반환한다.", () => {
      expect(findStockById(9999)).toBe(-1);
    });
  });

  describe("isAlreadyExist", () => {
    it("존재하는 상품이면 true를 반환한다.", () => {
      save(validProduct);
      const [product] = findAll();
      expect(isAlreadyExist(product.id)).toBe(true);
    });

    it("존재하지 않는 상품이면 false를 반환한다.", () => {
      expect(isAlreadyExist(9999)).toBe(false);
    });
  });

  describe("deleteById", () => {
    it("존재하는 상품을 삭제하면 true를 반환하고 상품이 제거된다.", () => {
      save(validProduct);
      const [product] = findAll();
      expect(deleteById(product.id)).toBe(true);
      expect(findAll()).toHaveLength(0);
    });

    it("존재하지 않는 상품을 삭제하면 false를 반환하고 다른 상품이 삭제되지 않는다.", () => {
      save(validProduct);
      expect(deleteById(9999)).toBe(false);
      expect(findAll()).toHaveLength(1);
    });
  });
});
