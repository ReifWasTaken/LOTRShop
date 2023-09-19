import { ProductModel } from "../models/products.model.js";


class ProductsDAO{

    async getAllProducts(limit, pages, sort, query) {

        const filter = query? { title: { $regex: query.prod, $options: "i" } }: {};
        
        const queryResults = await ProductModel.paginate(filter, {
            limit: limit || 3,
            page: pages || 1,
            sort: sort || {}, 
            lean: true,
        });  
        
        return queryResults;
    }

    async productCreation(newProduct){

        const productAdded = await ProductModel.create({...newProduct});

        console.log(productAdded)
        return productAdded;
    }

    async getProductByID(solicitedID){

    const productFound = ProductModel.findById(solicitedID);

    if (!productFound) {
        throw new Error("Product do not exist");
    }

    return productFound;
    }
}

export default ProductsDAO;