import productModel from '../models/product.js';

export const getAllProducts = async (req, res) => {
    try {
        const product = await productModel.find();
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: "Error fetching Products" });
    }
}

export const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productModel.findOne({ id: productId })
        if (!product) 
            return res.status(404).json({ message: "Product Not found" })
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json({ message: "Error fetching product" })
    }
}

export const addNewProduct = async (req, res) => {
    try {
        const { name, description, image, price, stock } = req.body
        const newProduct = new productModel({ name, description, image, price, stock })

        await newProduct.save();
        res.status(200).json(newProduct)
    } catch (err) {
        res.status(500).json({ message: "Error adding product", error: err.message })
    }
}

export const updateProduct = async (req, res) => {
      const { id } = req.params;
      const { name, description, image, price, stock } = req.body;
    
      try {
        const updated = await cartModel.findOneAndUpdate(
            { id },
            { name, description, image, price, stock }
        );
        if (!updated) return res.status(404).json({ message: "Product not found!" });
    
        res.json(updated);
      } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Failed to update product!" });
      }
}

export const deleteProduct = async (req, res) => {
    try {
    const { id } = req.params;

    const deleted = await productModel.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
}