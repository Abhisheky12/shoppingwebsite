const express=require("express");
const productRouter=express.Router();
const {createProducts,getAllProducts,updateProduct,deleteProduct,getsingleProduct,getAdminProducts, createReviewForProduct,getProductReviews} =require("../controller/productController");
const {verifyUserAuth, roleBasedAccess}=require("../middleware/userAuth");

//create product
productRouter.post("/admin/createproduct",verifyUserAuth,roleBasedAccess("admin"),createProducts);
//getall product
productRouter.get("/getproducts",getAllProducts);
//updatep roduct
productRouter.put("/admin/updateproduct/:id",verifyUserAuth,roleBasedAccess("admin"),updateProduct);
//delete product
productRouter.delete("/admin/deleteproduct/:id",verifyUserAuth,roleBasedAccess("admin"),deleteProduct);
//getsingle product detail
productRouter.get("/getsingleproduct/:id",getsingleProduct);
//Admin get all product
productRouter.get("/admin/getallproduct",getAdminProducts);
//creating and updating review
productRouter.put("/review",verifyUserAuth,createReviewForProduct);
//getProduct review
productRouter.get("/review",getProductReviews);
module.exports=productRouter;