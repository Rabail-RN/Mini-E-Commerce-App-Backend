import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true, default: 0},
}, {timestamps: true});

const productModel = mongoose.model("product", productSchema);

export default productModel;