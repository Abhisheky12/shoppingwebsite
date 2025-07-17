const express=require("express");
const authRouter=express.Router();
const {registerUser,loginUser}=require("../controller/userController");



//register
authRouter.post("/register",registerUser);
//login
authRouter.post("/login",loginUser);



module.exports=authRouter;