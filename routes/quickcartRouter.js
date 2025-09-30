import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import { createCart, addToCart, getCartItems, removeFromCart, clearCart, updateCartItem } from "../controllers/cartController.js";
import { getAllProducts, getProductById, addNewProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { registerUser, loginUser } from "../controllers/userController.js";
import { createOrder, getOrderById } from "../controllers/orderController.js";

const quickcartRouter = Router();


quickcartRouter.post("/users/register", registerUser);
quickcartRouter.post("/users/login", loginUser);

quickcartRouter.get("/products", getAllProducts);
quickcartRouter.get("/products/:id", getProductById);
quickcartRouter.post("/products", authMiddleware, adminMiddleware, addNewProduct);
quickcartRouter.put("/products/:id", authMiddleware, adminMiddleware, updateProduct);
quickcartRouter.delete("/products/:id", authMiddleware, adminMiddleware, deleteProduct);

quickcartRouter.post("/cart", authMiddleware, createCart);
quickcartRouter.get("/cart", authMiddleware, getCartItems);
quickcartRouter.post("/cart/add", authMiddleware, addToCart);
quickcartRouter.put("/cart/:id", authMiddleware, updateCartItem);
quickcartRouter.delete("/cart/:id", authMiddleware, removeFromCart);
quickcartRouter.delete("/cart", authMiddleware, clearCart);

quickcartRouter.post("/order", authMiddleware, createOrder);
quickcartRouter.get("/order/:id", authMiddleware, getOrderById);

export default quickcartRouter;