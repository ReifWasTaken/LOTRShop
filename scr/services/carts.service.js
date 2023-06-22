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
        const cartFound = await cartModel.findById(solicitedID).populate("products.productId")

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
            cartFound.products.push({productId: productFound._id, quantity: solicitedQuantity});
            const updateCart = await cartModel.updateOne({_id: solicitedCartID}, cartFound);
            return updateCart;
        }
    }
//-------------------------------------------------------------------------------------------

    async removeProductFromCart(solicitedCartID, solicitedProductID){
        const cartFound = await cartModel.findOne({_id: solicitedCartID});

        if(!cartFound){
            throw new Error("Cart not found");
        }

 /*        const productFound = await ProductModel.findById({_id: solicitedProductID});
        
        if(!productFound){
            throw new Error ("Product not found");

        
        
       console.log(solicitedProductID)
        console.log(cartFound)
        console.log(typeof(solicitedProductID)) */
        const index = await cartFound.products.findIndex(products => products.productId._id.toString() === solicitedProductID);
/*          JSON.parse(index) */
/*         console.log(typeof(index))
        console.log(index)
        if(index === -1){
            throw new Error ("Product is not in the cart");
        }

        console.log(index) */
        
            cartFound.products.splice(index, 1)
            const updateCart = await cartModel.updateOne({_id: solicitedCartID}, cartFound);
            return updateCart;
        

    }
//-------------------------------------------------------------------------------------------

    async modifyCart(solicitedCartID, toBeModify){

        const cartFound = await cartModel.findByIdAndUpdate({_id: solicitedCartID}, []);
        
        const updateCart = await cartModel.updateOne({_id: solicitedCartID}, cartFound);
        return updateCart;

    }
}

export default CartService;
