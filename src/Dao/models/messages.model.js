import {Schema, model} from "mongoose";

// crear el esquema
const messagesSchema = new Schema({
  nombre: {
    type: String,
    required: true
  }
})

//crear el modelo/collection
export const messagesModel = model('Messages', messagesSchema)
