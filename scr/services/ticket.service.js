import CartsDAO from "../DAO/classes/cartsDAO.model.js";
import ProductsDAO from "../DAO/classes/producsDAO.model.js";
import ticketsDao from "../DAO/classes/ticketDAO.model.js";

const productsDAO = new ProductsDAO();
const cartDAO = new CartsDAO();

class TicketServices{
  
  async purchase(solicitedCartID, purchaser){
   purchaser = "gregodelgado182@gmail.com"
    try{ 
      const cart = await cartDAO.getCartByID(solicitedCartID)
      if (cart.products.length < 1) return { code: 404, result: { status: "empty", message: "Cart is empty" } };
      let amount = 0;
      
      //compare the products in the cart and save it in a new object
      for (const cartProduct of cart.products) {
        const productDB = await productsDAO.getProductByID(cartProduct.productId._id)
        
        //checks if the stock is enought
        if(cartProduct.productId.stock < cartProduct.quantity){
          return {
            code: 404,
            result: {
              status: "nostock",
              message: `Not enough stock for product ${cartProduct.productId.title}`,
            },
          }
        }
        //add the total for each product
        amount += cartProduct.productId.price * cartProduct.quantity;
        
        //remove the stock of that product
        productDB.stock -= cartProduct.quantity; 
        
        await productsDAO.productsUpdate(productDB._id, productDB);
        
        
      }
      //generate the ticket 
      
      const ticket = await ticketsDao.createTicket(amount, purchaser);
      
      return { code: 200, result: { status: "success", message: "Purchase successful", payload: ticket } };
    }
    catch(error){
      console.log(error)
    }
  }
  
}

export default TicketServices;