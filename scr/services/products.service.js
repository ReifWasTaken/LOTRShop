import ProductsDAO from "../DAO/classes/producsDAO.model.js";
const productsDAO = new ProductsDAO();


class ProductsService {

    async getAllProducts(limit, pages, sort, query,) {
        try{    
        const queryResults = await productsDAO.getAllProducts(limit, pages, sort, query)
        
        const {docs, ...rest} = queryResults;
        
        let products = docs.map(doc =>{
            return{
                _id: doc._id,
                title: doc.title,
                description: doc.description,
                price: doc.price,
                thumbnail: doc.thumbnail,
                code: doc.code,
                stock: doc.stock,
                category: doc.category,}
            })
        return {products, pagination: rest};
        }
        catch(err){
            return { code: 400, result: { status: "error", message: "Error getting products" } };
          }
          }

//-------------------------------------------------------------------------------------------

    async productCreation(newProduct) {
    try{ 
      
        await productsDAO.productCreation(newProduct)

        return newProduct;
    }
    catch{
        
        return { code: 400, result: { status: "error", message: "Error creating the product" } };
    }
}

//-------------------------------------------------------------------------------------------
async getProductByID(solicitedID) {

    try{
    const productFound = await productsDAO.getProductByID(solicitedID);

    return productFound;
    }
    catch{
        
        return { code: 400, result: { status: "error", message: "Error getting the product" } };
    }
    }
//-------------------------------------------------------------------------------------------

    async productsUpdate(solicitedID, newProduct) {
        try{

            const productUpdated = await productsDAO.productsUpdate(solicitedID, newProduct);
            
            return productUpdated;
        }
        catch{
            return {code: 400, result: {status: "error", massage: "Error updating the product"} };
        }
    }
    
    //-------------------------------------------------------------------------------------------
    async productDelete(solicitedID) {
        try{
         
            const prod = await productsDAO.productDelete(solicitedID);
            
            return (prod, "Product Deleted");
        }
     catch(err){  

          return {code: 400, result: {status: "error", massage: "Error deleting the product"} };
        }   
    
}

}


export default ProductsService;