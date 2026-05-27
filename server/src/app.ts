import express from "express";
import {
  createProduct,
  getProducts,
} from "./controllers/products.controller.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
app.use(express.json());

app.get("/products", getProducts);
app.post("/products", createProduct);
app.delete("/products/:id", () => {});

app.get("/cart", () => {});
app.patch("/cart", () => {});
app.delete("/cart/:id", () => {});

app.use(errorHandler);

export default app;
