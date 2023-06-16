import { Error } from "mongoose";
import { ProductModel } from "../DAO/models/products.model.js";


class ProductsService {
//-------------------------------------------------------------------------------------------
    async getAllProducts() {

        const products = await ProductModel.find({});
        return products;
    }
//-------------------------------------------------------------------------------------------
    async productsValidation(newProduct) {
        if (
            !newProduct.title ||
            !newProduct.description ||
            !newProduct.price ||
            !newProduct.thumbnail ||
            !newProduct.code ||
            !newProduct.stock ||
            !newProduct.category) {

            console.log("Something is missing");

            throw new Error("Something is missing");
        }
    }
//-------------------------------------------------------------------------------------------
    async productsCreation(newProduct) {

        this.productsValidation(newProduct);

        await ProductModel.create({ ...newProduct });

        return newProduct;
    }
//-------------------------------------------------------------------------------------------
    async productsDelete(solicitedID) {

        const productFound = await ProductModel.deleteOne({ _id: solicitedID });

        return productFound;
    }
//-------------------------------------------------------------------------------------------
    async productsUpdate(solicitedID, newProduct) {

        if (!solicitedID) {
            throw new Error("Product does not exist");
        }

        if (newProduct.id) {
            throw new Error("Product's ID cant be updated");
        }

        if (solicitedID)
            await ProductModel.updateOne({ _id: solicitedID }, { ...newProduct });
    }
//-------------------------------------------------------------------------------------------
    async getProductByID(solicitedID) {

        const productFound = await ProductModel.findById(solicitedID);

        if (!productFound) {
            throw new Error("Product do not exist");
        }

        return productFound;
    }
}


export default ProductsService;