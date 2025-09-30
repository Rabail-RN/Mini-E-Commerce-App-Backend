import cartModel from '../models/cart.js';

export const createCart = async (req, res) => {
    try {
        const userId = req.user.id;

        let cart = await cartModel.findOne({ userId });
        if (cart) {
        return res.status(200).json(cart);
        }

        cart = new cartModel({ userId, items: [] });
        await cart.save();

        res.status(201).json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create cart" });
    }
    
}

export const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        let cart = await cartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to add to cart" });
    }
}

export const getCartItems = async (req, res) => {
    const userId = req.user.id;

    try {
        const cart = await cartModel.findOne({ userId }).populate("items.productId");
        if (!cart) return res.status(404).json({ message: "Cart not found!" });

        res.json(cart);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Failed to fetch cart items" });
    }
}

export const updateCartItem = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await cartModel.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found!" });

    const item = cart.items.id(id);
    if (!item) return res.status(404).json({ message: "Item not found in cart!" });

    if (quantity <= 0) {
        cart.items = cart.items.filter(i => i._id.toString() !== id);
    } else {
        item.quantity = quantity;
    }

    await cart.save();
    await cart.populate("items.productId");

    res.json(cart);
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Failed to update cart!" });
  }
}

export const removeFromCart = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    try {
        const cart = await cartModel.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found!" });

        const item = cart.items.id(id);
        if (!item) return res.status(404).json({ message: "Item not found in cart!" });

        cart.items = cart.items.filter(i => i._id.toString() !== id);

        await cart.save();
        await cart.populate("items.productId");

        res.json(cart);
    } catch (error) {
        console.error("Error removing item", error);
        res.status(500).json({ message: "Failed to remove item from the cart!" });
    }

}

export const clearCart = async (req, res) => {
    const userId = req.user.id;

    try {
        const cart = await cartModel.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found!" });

        cart.items = [];
        await cart.save();

        res.json(cart);
    } catch (error) {
        console.error("Error clearing cart", error);
        res.status(500).json({ message: "Failed to clear cart!" });
    }
}