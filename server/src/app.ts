import express from "express";
import { createProduct, deleteProduct, getProducts } from "./controllers/products.controller.js";
import { getCartItems, updateCartItemQuantity, deleteCartItem } from "./controllers/cart.controller.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
app.use(express.json());

app.get("/products", getProducts);
app.post("/products", createProduct);
app.delete("/products/:id", deleteProduct);

app.get("/cart", getCartItems);
app.patch("/cart/:id", updateCartItemQuantity);
app.delete("/cart/:id", deleteCartItem);

app.use(errorHandler);

export default app;
