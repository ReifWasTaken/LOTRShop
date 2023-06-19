import { Error } from "mongoose";
import { cartModel } from "../DAO/models/carts.model.js";
import ProductsService from "../services/products.service.js";
import { ProductModel } from "../DAO/models/products.model.js";
const productService = new ProductsService();


class CartService {

    async cartCreation(){
        const newCreation = await cartModel.create({});
        return newCreation;
    }
//-------------------------------------------------------------------------------------------

    async getCartByID(solicitedID){
        const cartFound = await cartModel.findById(solicitedID).populate("products.products");

        if(!cartFound){
            throw new Error("Cart not exist");
        }

        return cartFound;
    }
//-------------------------------------------------------------------------------------------

    async addProductToCart(solicitedCartID, solicitedProductID, solicitedQuantity){

        const cartFound = await cartModel.findById({_id: solicitedCartID});

        if(!cartFound){
            throw new Error("Cart not found");
        }

        const productFound = await ProductModel.findById({_id: solicitedProductID});
        
                if(!productFound){
            throw new Error ("Product not found");
        }

        parseInt(solicitedQuantity)
  
        
        if(cartFound && productFound){
            cartFound.products.push({products: productFound._id, quantity: solicitedQuantity});
            const updateCart = await cartModel.updateOne({_id: solicitedCartID}, cartFound);
            return updateCart;
        }
    }
}

export default CartService;
