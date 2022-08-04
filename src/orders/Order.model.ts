import { model, Schema } from "mongoose";

export const Order = model(
  "Order",
  new Schema({
    name: String,
    customer: {
      name: String,
      address: String,
      phone: String,
    },
    consent: {
      show_name: Boolean,
      show_price: Boolean,
    },
    payment: {
      method: String,
      amount: Number,
      transaction_id: String,
      status: String,
    },
  })
);

export default Order;
