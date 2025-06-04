const express=require("express");
const authRouter=express.Router();
const {register}=require("../controller/userController");



//register
authRouter.post("/register",register);



module.exports=authRouter;