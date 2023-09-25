import CartsDAO from "../DAO/classes/cartsDAO.model.js";
import ProductsDAO from "../DAO/classes/producsDAO.model.js";
import TicketsDao from "../DAO/classes/ticketDAO.model.js";

const productsDAO = new ProductsDAO();
const cartDAO = new CartsDAO();

class TicketServices{

    async purchase(solicitedCartID){
        
        const cart = await cartDAO.getCartByID(solicitedCartID)
        if (cart.products.length < 1) return { code: 404, result: { status: "empty", message: "Cart is empty" } };
        let totalAmount = 0;

        //compare the products in the cart and save it in a new object
        for (const cartProduct of cart.products) {
        console.log(cartProduct.productId._id, cartProduct.quantity, cartProduct.productId.stock)

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

        //remove the stock of that product

        //generate the ticket
        
        }
        return cart;
/*         for (const cartProduct of cart.products) {
          const productInDB = await productsDAO.getProductByID(cartProduct);
          if (productInDB.stock < cartProduct.quantity) {
            
          totalAmount += productInDB.price * cartProduct.quantity;
          productInDB.stock -= cartProduct.quantity;
          await productsDAO.productsUpdate(productInDB._id, productInDB);
          await cartDAO.productsUpdate(solicitedCartID, cartProduct.idProduct.toString());
        }
        const ticket = await TicketsDao.createTicket(purchaser, totalAmount);

        return { code: 200, result: { status: "success", message: "Purchase successful", payload: ticket } };
      }
       catch () {
        return { code: 500, result: { status: "error", message: "Couldn't purchase products." } };
      } */
    }

}
    

export default TicketServices;