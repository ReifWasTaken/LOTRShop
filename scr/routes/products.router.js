import express from "express"
import classProducts from "../productManager.js";
import { ProductModel } from "../models/products.model.js"
const productsRouter = express.Router();
const productManager = new classProducts();


productsRouter.get("/", async (req, res) => {
  try{
  const limit = req.query.limit;
  const products = await ProductModel.find({});
  
  if(limit){
    return res.status(200).json({
    status: "success",
    msg: "Product List",
    data: (products.slice(0, limit))
    });
  }else{
    return res.status(200).json({
    status: "success",
    msg: "Product List",
    data: products,
    });
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

productsRouter.post("/", async (req, res)=>{
  try{
  const newProduct =  req.body;

    if(
      !newProduct.title ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.thumbnail ||
      !newProduct.code ||
      !newProduct.stock ||
      !newProduct.category){

        return res.status(400).json({
        status: "error",
        msg: "some data is missing"
        });
    }

  await ProductModel.create({...newProduct});
  
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


productsRouter.get("/:pid", async (req, res) => {
  try{
  const solicitedID = req.params.pid; 
  const productFound = await ProductModel.findById(solicitedID);

  if(productFound){     
    return res.status(200).json({
    status: "success",
    msg: "Product info",
    data: productFound,
    });  
  }

}

catch(err){   
  return  res.status(404).json({
    status: "error",
    msg: "Product does not exist",
  });
}

});

productsRouter.put("/:pid", async (req, res)=>{
  try{
    const solicitedID = req.params.pid; 
    const newProduct =  req.body;

    if(newProduct.id){
      return  res.status(404).json({
        status: "error",
        msg: "Product's ID cant be updated",
      });

    }
    if(solicitedID){
      await ProductModel.updateOne({_id : solicitedID}, {...newProduct});
      
      return res.status(201).json({
        status: "success",
        msg: "product updated succesfuly",
        data: newProduct
      })
    }

  }
  catch{
    return  res.status(404).json({
      status: "error",
      msg: "Product does not exist",
    });
  }
})

productsRouter.delete("/:pid", async (req, res)=> {
  try{
    const solicitedID = req.params.pid; 
    const productFound = await ProductModel.deleteOne({ _id: solicitedID});

    if(!productFound){
      return  res.status(404).json({
        status: "error",
        msg: "Product does not exist",
      });

    }
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

productsRouter.get("/:pid/test", async (req, res) => {
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

});

export {productsRouter};