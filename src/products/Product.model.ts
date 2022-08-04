import { model, Schema } from "mongoose";

export const Product = model(
  "Product",
  new Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
  })
);

export default Product;
