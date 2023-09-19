import express from "express"
import ProductsService from "../services/products.service.js";
import { validUser } from "../middleware/userAuntentification.js";
import ProductsController  from "../controllers/products.controllers.js";
import { productsValidation } from "../middleware/productsMiddleware.js";
const productController = new ProductsController()
const productsRouter = express.Router();

productsRouter.get("/", validUser, productController.getAllProducts);

productsRouter.post("/",productsValidation, productController.productCreation);

productsRouter.get("/:pid", productController.getProductByID)

//-------------------------------------------------------------------------------------------
/*
productsRouter.put("/:pid", async (req, res)=>{
  try{
    const solicitedID = req.params.pid; 
    const newProduct =  req.body;

    const toBeUpdated = await productsController.productsUpdate(solicitedID, newProduct);
      
      return res.status(201).json({
        status: "success",
        msg: "product updated succesfuly",
        data: toBeUpdated
      })

  }
  catch{
    return  res.status(404).json({
      status: "error",
      msg: "Product does not exist",
    });
  }
})

//-------------------------------------------------------------------------------------------

productsRouter.delete("/:pid", async (req, res)=> {
  try{
    const solicitedID = req.params.pid; 
   
    const productFound = await productsController.productsDelete(solicitedID);

    return res.status(200).json({
      status: "success",
      msg: "the products has been deleted",
      data: productFound,
    });
  
      
  }
  catch(err){
    return  res.status(404).json({
      status: "error",
      msg: "Product does not exist",
    })};
  })*/

//-------------------------------------------------------------------------------------------

/* productsRouter.get("/:pid/test", async (req, res) => {
  try{
  const solicitedID = req.params.pid; 
  const productFound = await ProductModel.findById(solicitedID);

  if(productFound){     
    return res.status(200).render("products", productFound);

}
  }

catch(err){   
  return  res.status(404).json({
    status: "error",
    msg: "Product does not exist",
  });
}

}); */

export {productsRouter};