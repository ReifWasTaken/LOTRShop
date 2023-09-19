import mongoose from "mongoose";
import ProductsService from "../services/products.service.js";


export const productsValidation = async (req, res, next) => {
        const product = req.body
    if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.thumbnail ||
        !product.code ||
        !product.stock ||
        !product.category) {

        return res.status(403).send("something is missing")
    }
    else{
        
        return next()
    }
}

//-------------------------------------------------------------------------------------------