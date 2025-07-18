const express=require("express");
const produtRouter=express.Router();
const {createProducts,getAllProducts,updateProduct,deleteProduct,getsingleProduct} =require("../controller/productController");
const {verifyUserAuth}=require("../middleware/userAuth");

//create product
produtRouter.post("/createproduct",verifyUserAuth,createProducts);
//getall product
produtRouter.get("/getproducts",verifyUserAuth,getAllProducts);
//updatep roduct
produtRouter.put("/updateproduct/:id",updateProduct);
//delete product
produtRouter.delete("/deleteproduct/:id",deleteProduct);
//getsingle product detail
produtRouter.get("/getsingleproduct/:id",getsingleProduct);


module.exports=produtRouter;