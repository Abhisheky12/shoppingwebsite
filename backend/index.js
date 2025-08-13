const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { main } = require("./config/db")
require("dotenv").config();
// const cors = require("cors");
const cookieParser = require("cookie-parser");



// setting cloudinary
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SEC
})




//importing route
const authRouter=require("./route/userRoute");
const productRouter=require("./route/productRoute");
const orderRouter=require("./route/orderRoute");
const paymentrouter=require("./route/paymentRoutes");


//running frontend and backend on sameport
// app.use(
//     cors({
//         origin: "http://localhost:5173",
//         methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//         allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Expires", "Pragma"],
//         credentials: true,
//     })
// );



//middleware

app.use(cookieParser());  // parse cookies from the incoming HTTP requests, and make them easily accessible via req.cookies.
app.use(express.json({ limit: '20mb' })); // Parses incoming JSON request bodies and makes them available as req.body.
app.use(fileUpload());
app.use(express.urlencoded({ limit: '20mb',extended: true })); // For parsing application/x-www-form-urlencoded

//routes
app.use("/api/v1",authRouter);
app.use("/api/v1",productRouter);
app.use("/api/v1",orderRouter);
app.use("/api/v1",paymentrouter);

















const InitializeConnection = async () => {
    try {

        await main();
        console.log("connected to database");

        app.listen(process.env.PORT, () => {
            console.log("server is runnning on " + process.env.PORT);

        })

    }
    catch (error) {
        console.log(error.message);

    }
}
InitializeConnection();