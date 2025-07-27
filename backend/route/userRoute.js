const express=require("express");
const authRouter=express.Router();
const {registerUser,loginUser,logout,resetPassword}=require("../controller/userController");


//register
authRouter.post("/register",registerUser);
//login
authRouter.post("/login",loginUser);
//logout
authRouter.post("/logout",logout);
//resetpassword
authRouter.post("/resetpassword",resetPassword);



module.exports=authRouter;