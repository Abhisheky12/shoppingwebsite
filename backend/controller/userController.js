
const { User } = require("../modals/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { log } = require("console");
const sendEmail=require("../utils/sendEmail");



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
        res.cookie("token", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
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

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            throw new Error("User not exist.Please enter valid email");
        }

        // const match=await bcrypt.compare(password,user.password);
        const isPasswordValid = await user.verifyPassword(password);
        if (!isPasswordValid) {
            throw new Error("Please enter valid email or password");
        }

        //send jwt token to the user
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "3d" });
        res.cookie("token", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })


        return res.status(200).json({
            success: true,
            user,
            token
        })


    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message
        })

    }


}
//logout
const logout = async (req, res) => {

    try {

        res.cookie("token", null, { maxAge: 0, httpOnly: true });

        return res.status(200).json({
            status: false,
            message: "Successfully logged out"
        })

    } catch (error) {
        return res.status(404).json({
            status: false,
            message: "Problem during logout"
        })
    }



}
//resetpassword
const resetPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        //  Generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");

        //  Hash token and set fields on user object (not saved to DB yet)
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpire = Date.now() + 5 * 60 * 1000; // expires in 15 minutes

        // Save updated user to DB   or // can also use findbyId and update
        await user.save({ validateBeforeSave: false });


        const resetPasswordURL = `http://localhost/user/reset/${resetToken}`;
        const message=`use the following link to reset your password :${resetPasswordURL}.\n\n This link will be exprired in 5 minutes.\n\n If you did not request a password reset, please igonore this message`;

        //send email
        await sendEmail({
            email:user.email,
            subject:"Password reset request",
            message:message
        })

        res.status(200).json({
            success: true,
            message: "Reset token generated successfully",
            resetToken, // this raw token will be sent via email normally
        });


    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }


}


module.exports = { registerUser, loginUser, logout, resetPassword };