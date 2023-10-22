import mongoose from "mongoose";

// crear el esquema
const cartSchema = new mongoose.Schema({
  products: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Products",
  },
  quantity: {
    type: Number,
  },
});

//crear el modelo/collection
export const cartsModel = model("Carts", cartSchema);
