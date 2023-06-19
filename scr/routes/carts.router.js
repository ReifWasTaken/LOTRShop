import express from "express";
import CartService from "../services/carts.service.js";
const cartServices = new CartService();
const cartsRouter = express.Router();




cartsRouter.post("/", async (req, res)=>{
    try{
        const newCreation = await cartServices.cartCreation();
        return res.status(201).json({
            status: "success",
            msg: "cart created",
            data: newCreation,
        });
    }
    catch(err){
        return res.status(400).json({
            status:"error",
            msg: "cart can not be created",
        });
    }
})

cartsRouter.get("/:cid", async (req, res)=>{
    try{
      const solicitedID = req.params.cid;
      
      const cartFound = await cartServices.getCartByID(solicitedID);
     
          if(cartFound){
           
            return res.status(201).json({
              status: "success",
              msg: "Cart found succesfuly",
              data: cartFound,
            })
          }
      
        }
        catch{
          return  res.status(404).json({
            status: "error",
            msg: "Cart does not exist",
          });
        }
    
})

cartsRouter.post("/:cid/product/:pid", async (req, res)=>{
  try{
    const solicitedCartID = req.params.cid;
    const solicitedProductID = req.params.pid;
    const solicitedQuantity = req.body.quantity;
 
    const carrito = await cartServices.addProductToCart(solicitedCartID, solicitedProductID, solicitedQuantity);  

            return res.status(201).json({
                status: "success",
                msg: "cart updated",
                data: carrito,
            })
        
    }
    catch(err){
      console.log(err);
        return  res.status(404).json({
            status: "error",
            msg: "error adding the product to the cart",
          });
    }
});

/* cartsRouter.get("/:cid/test", async (req, res)=>{
  try{
      const solicitedID = req.params.cid;
      const cartFound = await cartManager.getCartById(parseInt(solicitedID));

        if(cartFound){
         
          return res.status(201).render("carts", cartFound);
        }
    
      }
      catch{
        return  res.status(404).json({
          status: "error",
          msg: "Cart does not exist",
        });
      }
  
}) */
export {cartsRouter};