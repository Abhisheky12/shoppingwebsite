
const jwt=require("jsonwebtoken");
const { User } = require("../modals/userModel");
const verifyUserAuth=async(req,res,next)=>{
         try {
        
          //extracting token from send by browser
         const {token}=req.cookies;
         if(!token){
            throw new Error("Please login to continue");
         }
         //verifying token
         const decodeData=jwt.verify(token,process.env.SECRET_KEY);
         console.log(decodeData);

         req.user=await User.findById(decodeData.id);
         
         next();

         } catch (error) {
            return res.status(401).json({
                success:false,
                message:error.message
            })
         }
         
}
module.exports={verifyUserAuth};