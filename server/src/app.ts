import cors from "cors";
import express from "express";
import { createProduct, deleteProduct, getProducts } from "./controllers/products.controller.js";
import { getCartItems, updateCartItemQuantity, deleteCartItem } from "./controllers/cart.controller.js";
import errorHandler from "./middlewares/errorHandler.js";
import { validateProductId, validateCartItemId } from "./middlewares/validateId.js";

const app = express();
app.use(
  cors({
    origin: [/\.github\.io$/, "http://localhost:5173"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());

app.get("/products", getProducts);
app.post("/products", createProduct);
app.delete("/products/:id", validateProductId, deleteProduct);

app.get("/cart", getCartItems);
app.patch("/cart/:id", validateCartItemId, updateCartItemQuantity);
app.delete("/cart/:id", validateCartItemId, deleteCartItem);

app.use((_request, response) => {
  response.status(404).json({ code: "NOT_FOUND", message: "요청한 리소스를 찾을 수 없습니다." });
});

app.use(errorHandler);

export default app;
