const express=require("express");
const authRouter=express.Router();
const {registerUser,loginUser,logout}=require("../controller/userController");


//register
authRouter.post("/register",registerUser);
//login
authRouter.post("/login",loginUser);
//logout
authRouter.post("/logout",logout);



module.exports=authRouter;