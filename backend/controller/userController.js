
const { User } = require("../modals/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { log } = require("console");
const sendEmail = require("../utils/sendEmail");



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


//requestresetpassword
const requestresetPassword = async (req, res) => {
    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Hash token and set fields
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpire = Date.now() + 5 * 60 * 1000;

        await user.save({ validateBeforeSave: false });

        const resetPasswordURL = `http://localhost/user/reset/${resetToken}`;
        const message = `Use the following link to reset your password: ${resetPasswordURL}.\n\nThis link will expire in 5 minutes.\n\nIf you did not request a password reset, please ignore this message`;

        // Try sending the email
        try {
            await sendEmail({
                email: user.email,
                subject: "Password reset request",
                message: message
            });

            return res.status(200).json({
                success: true,
                message: `Email is sent to ${user.email}`
            });
        } catch (emailError) {
            // Clean up token if email fails
            console.log(emailError);

            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });

            return res.status(500).json({
                success: false,
                message: "Failed to send email"
            });
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

//resetpassword
const resetPassword = async (req, res) => {

    try {
        const tokenid = req.params.resettoken;
        console.log(tokenid);

        const resetPasswordToken = crypto.createHash("sha256").update(tokenid).digest("hex");
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })
        if (!user) {
            throw new Error("reset Password token is invalid or has been expired")
        }

        const { password, confirmPassword } = req.body;
        if (password != confirmPassword) {
            throw new Error("Password not  match")
        }
        //storing newpassword to database
        const hashpassword = await bcrypt.hash(password, 10);
        user.password = hashpassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return res.status(200).json({
            status: true,
            message: "Password updated successfully"
        })



    } catch (error) {
        return res.status(404).json({
            status: false,
            message: error.message
        })
    }

}
//Get user details
const fetchProfile = async (req, res) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })

}
//update password
const updatePassword = async (req, res) => {
    try {
        const { oldpassword, newpassword, confirmNewPassword } = req.body;
        const user = await User.findOne(req.user.id);

        const verifypassword = await bcrypt.compare(oldpassword, user.password);

        if (!verifypassword) {
            return res.status(400).json({
                success: false,
                message: "Enter valid previous password"
            })
        }

        if (newpassword != confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Confirm password not matched"
            })
        }

         return res.status(200).json({
                success:false,
                message:"Password updated successfully"
            })



    } catch (error) {
          return res.status(400).json({
                success:false,
                message:"Server Error"
            })
    }
}



module.exports = { registerUser, loginUser, logout, requestresetPassword, resetPassword, fetchProfile,updatePassword };