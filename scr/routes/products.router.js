import express from "express"
import ProductsService from "../services/products.service.js";
import { validUser } from "../middleware/userAuntentification.js";
const productService = new ProductsService();
const productsRouter = express.Router();

//-------------------------------------------------------------------------------------------
productsRouter.get("/", validUser, async (req, res) => {
  try{
    const limit = req.query.limit
    const pages = req.query.page
    const sort = req.query.sort
    const query = req.query.query
    const user = req.session.user

    const {products, pagination} = await productService.getAllProducts(limit, pages, sort, query);
    
    if(products){
      return res.status(200).render("products", {user, products, pagination});
    }
}
catch(err){
  return  res.status(404).json({
    status: "error",
    msg: "Product List does not exist",
    data: {},
  });
}
});

//-------------------------------------------------------------------------------------------

productsRouter.post("/", async (req, res)=>{
  try{
  const newProduct =  req.body;
    
  await productService.productsCreation(newProduct)
  
  return res.status(201).json({
    status: "succes",
    msg: "producct added succesfully",
    data: newProduct,
  });
}

catch(err){
  return res.status(400).json({
    status: "error",
    msg: "there was an error adding the product",
    data: err
  })
}
});

//-------------------------------------------------------------------------------------------

productsRouter.get("/:pid", async (req, res) => {
  try{
  const solicitedID = req.params.pid; 

  const productFound = await productService.getProductByID(solicitedID);

    return res.status(200).json({
    status: "success",
    msg: "Product info",
    data: productFound,
    });  
}

catch(err){   
  return  res.status(404).json({
    status: "error",
    msg: "Product does not exist",
  });
}

});

//-------------------------------------------------------------------------------------------

productsRouter.put("/:pid", async (req, res)=>{
  try{
    const solicitedID = req.params.pid; 
    const newProduct =  req.body;

    const toBeUpdated = await productService.productsUpdate(solicitedID, newProduct);
      
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
   
    const productFound = await productService.productsDelete(solicitedID);

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
  })

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