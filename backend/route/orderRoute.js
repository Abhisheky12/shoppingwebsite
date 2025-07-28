const express=require("express");
const orderRouter=express.Router();
const {createNewOrder,getSingleOrder,allMyOrders, getAllOrders}=require("../controller/orderController");
const {verifyUserAuth, roleBasedAccess}=require("../middleware/userAuth");


//creating order
orderRouter.post("/new/order",verifyUserAuth,createNewOrder);
//getsingle order
orderRouter.get("/admin/order/:id",verifyUserAuth,roleBasedAccess("admin"),getSingleOrder);
//All my orders(user want to see their order)
orderRouter.get("/orders/user",verifyUserAuth,allMyOrders);
//All orders(admin can see all orders)
orderRouter.get("/admin/orders",verifyUserAuth,roleBasedAccess("admin"),getAllOrders);


module.exports=orderRouter;