import CartsService from "../services/carts.service.js";
const cartsServices = new CartsService();

class CartController {
    async cartsCreation(req, res){

      const newCreation = await cartsServices.cartsCreation();
      
      return res.status(201).json({
        status: "success",
        msg: "cart created",
        data: newCreation,
      });
    }

//-------------------------------------------------------------------------------------------

    async getCartByID(req, res) {
    
          const solicitedID = req.params.cid;
      
          const cartFound = await cartsServices.getCartByID(solicitedID);
      
            return res.status(201).json({
              data: cartFound,
            })
        }
//-------------------------------------------------------------------------------------------
    async addProductToCart(req, res){
           const solicitedCartID = req.params.cid;
          const solicitedProductID = req.params.pid;
      
          const carrito = await cartsServices.addProductToCart(solicitedCartID, solicitedProductID);
      
          return res.status(201).json({
            data: carrito,
        })
    }
//-------------------------------------------------------------------------------------------


async removeProductFromCart(req, res){
  
  const solicitedCartID = req.params.cid;
  const solicitedProductID = req.params.pid;
  
  const carrito = await cartsServices.removeProductFromCart(solicitedCartID, solicitedProductID);
  
  return res.status(201).json({
    data: carrito,
  })
}
//-------------------------------------------------------------------------------------------

async modifyCart (req, res) {
  
  const solicitedCartID = req.params.cid;
  const toBeModify = req.body;
  
  const cart = await cartsServices.modifyCart(solicitedCartID, toBeModify); 
  
  return res.status(201).json({
    data: cart,
  })
}
//-------------------------------------------------------------------------------------------

async modifyQuantity(req, res){
  
  const solicitedCartID = req.params.cid;
  const solicitedProductID = req.params.pid;
  const solicitedQuantity = req.body.quantity;
  
  const carrito = await cartsServices.modifyQuantity(solicitedCartID, solicitedProductID, solicitedQuantity);
  
  return res.status(201).json({
    data: carrito,
  })
}
//-------------------------------------------------------------------------------------------

async deleteAllProducts(req, res) {

    const solicitedCartID = req.params.cid;

    const cart = await cartsServices.deleteAllProducts(solicitedCartID);

    return res.status(200).json({
      data: cart,
    })
  
}
}


export default CartController;