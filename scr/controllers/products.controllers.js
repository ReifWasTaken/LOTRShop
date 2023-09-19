import ProductsService from "../services/products.service.js"
const productService = new ProductsService();

class ProductsController{

    async getAllProducts (req, res) {
      const limit = req.query.limit
      const pages = req.query.page
      const sort = req.query.sort
      const query = req.query.query
      const user = req.session.user
  
      const {products, pagination} = await productService.getAllProducts(limit, pages, sort, query);

      return res.status(200).render("products", {user, products, pagination});

  }
//-------------------------------------------------------------------------------------------

  async productCreation(req, res){

    const newProduct =  req.body;

    const productAdded = await productService.productCreation(newProduct);
   
    return res.status(201).json({
      status: "succes",
      msg: "producct added succesfully",
      data: productAdded,
    });
  }
  //-------------------------------------------------------------------------------------------

  async getProductByID(req, res){

        const solicitedID = req.params.pid; 
      
        const productFound = await productService.getProductByID(solicitedID);
      
          return res.status(201).json({
          status: "success",
          msg: "Product info",
          data: productFound,
          });  
      }
  
//-------------------------------------------------------------------------------------------
 }

export default ProductsController;