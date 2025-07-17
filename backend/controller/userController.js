
const { User } = require("../modals/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //hash password
        hashpassword = await bcrypt.hash(password, 7);
        //creting user
        const user = await User.create({
            name,
            email,
            password: hashpassword,
            avatar: {
                public_id: "This is temp id ",
                url: "This is temperory url"
            }
        })
        //sending token to browser
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "3d" });
        return res.status(201).json({
            success: true,
            user,
            token
        })

    }
    catch (error) {
        // For Mongoose validation errors
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages[0]
            });
        }
        //  Custom error for duplicate email
        if (error.code === 11000 && error.keyValue.email) {
            return res.status(400).json({
                success: false,
                message: "Email is already registered. Please use a different email."
            });
        }
        //other error
        return res.status(404).json({
            success: false,
            message: error.message
        })

    }



}

//Login
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email) {
            throw new Error("Email cannot be empty");
        }
        if (!password) {
            throw new Error("Password cannot be empty");
        }

        const user=await User.findOne({email}).select("+password");
        if(!user){
            throw new Error("User not exist.Please enter valid email");
        }
        
        //send jwt token to the user
         const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "3d" });


         return res.status(200).json({
            success:true,
            user,
            token
         })


    } catch (error) {

        return res.status(404).json({
            success:false,
            message:error.message      
        })

    }


}


module.exports = { registerUser,loginUser };