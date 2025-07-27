const express=require("express");
const authRouter=express.Router();
const {registerUser,loginUser,logout,requestresetPassword,resetPassword,fetchProfile,updatePassword}=require("../controller/userController");
const {verifyUserAuth}=require("../middleware/userAuth");

//register
authRouter.post("/register",registerUser);
//login
authRouter.post("/login",loginUser);
//logout
authRouter.post("/logout",logout);
//requestresetpassword
authRouter.post("/requestresetpassword",requestresetPassword);
//resetpassword
authRouter.post("/resetpassword/:resettoken",resetPassword);
//getuserdetail
authRouter.get("/fetchprofile",verifyUserAuth,fetchProfile);
//updatepassword
authRouter.post("/updatepassword",updatePassword);



module.exports=authRouter;