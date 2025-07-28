const express=require("express");
const orderRouter=express.Router();
const {createNewOrder,getSingleOrder}=require("../controller/orderController");
const {verifyUserAuth, roleBasedAccess}=require("../middleware/userAuth");


//creating order
orderRouter.post("/new/order",verifyUserAuth,createNewOrder);
//getsingle order
orderRouter.post("/order/:id",verifyUserAuth,roleBasedAccess("admin"),getSingleOrder);


module.exports=orderRouter;