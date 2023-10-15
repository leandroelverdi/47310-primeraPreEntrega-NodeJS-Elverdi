import {Schema, model} from "mongoose";

// crear el esquema
const cartSchema = new Schema({
  nombre: {
    type: String,
    required: true
  }
})

//crear el modelo/collection
export const cartsModel = model('Carts', cartSchema)
