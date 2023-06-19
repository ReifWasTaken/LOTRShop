import { Schema, model } from "mongoose";

const cartSchema = new Schema({

    products:{
        type: [
            {
            products: {
                type: Schema.Types.ObjectId,
                ref: "products",
                requiered: true
            },
            quantity:{type: Number, requiered: true, min: 1, default: 0},
            _id: false
        }],
    },
});

/* cartSchema.pre("findById", function (){
    this.populate("products.products");
}); */

export const cartModel = model("carts", cartSchema);