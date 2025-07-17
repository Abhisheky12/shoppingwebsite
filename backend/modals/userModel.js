const mongoose=require("mongoose");
const {Schema}=mongoose;
const validate=require("validator");


const userSchema=new Schema({
    name:{
        type:String,
        required:[true,"Please Enter your name"],
        maxLength:[25,"Invalid name Please enter short name "],
        minLength:[3,"Name should contaion more than 2 characters"]
    },
    email:{
        type:String,
        required:[true,"Plese enter your email"],
        unique:true,
        validate:[validate.isEmail,"Please enter valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8,"Password should have atleast 8 characters"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
},{timestamps:true})

const User=mongoose.model("user",userSchema);
module.exports={User};