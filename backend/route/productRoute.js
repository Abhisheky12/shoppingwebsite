const express=require("express");
const productRouter=express.Router();
const {createProducts,getAllProducts,updateProduct,deleteProduct,getsingleProduct} =require("../controller/productController");
const {verifyUserAuth, roleBasedAccess}=require("../middleware/userAuth");

//create product
productRouter.post("/createproduct",verifyUserAuth,roleBasedAccess("admin"),createProducts);
//getall product
productRouter.get("/getproducts",verifyUserAuth,getAllProducts);
//updatep roduct
productRouter.put("/updateproduct/:id",verifyUserAuth,roleBasedAccess("admin"),updateProduct);
//delete product
productRouter.delete("/deleteproduct/:id",verifyUserAuth,roleBasedAccess("admin"),deleteProduct);
//getsingle product detail
productRouter.get("/getsingleproduct/:id",verifyUserAuth,getsingleProduct);


module.exports=productRouter;