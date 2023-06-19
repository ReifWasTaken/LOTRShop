import { Schema, model } from "mongoose";

const producsSchema = new Schema({

    title:{type: String, requiered: true, max: 100},
    description:{type: String, requiered: true, max: 100},
    price:{type: Number, requiered: true, max: 10000},
    thumbnail:{type: String, requiered: true, max: 100},
    code:{type: String, requiered: true, max: 100, unique: true},
    stock:{type: Number, requiered: true, max: 20},
    category:{type: String, requiered: true, max: 100},

});

export const ProductModel = model("products", producsSchema);