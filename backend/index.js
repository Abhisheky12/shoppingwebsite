const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { main } = require("./config/db")
require("dotenv").config();
const cookieParser = require("cookie-parser");
// const cors = require("cors");

//importing route
const authRouter=require("./route/userRoute");
const productRouter=require("./route/productRoute");
const orderRouter=require("./route/orderRoute");



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
app.use(express.json()); // Parses incoming JSON request bodies and makes them available as req.body.


app.use("/api/v1",authRouter);
app.use("/api/v1",productRouter);
app.use("/api/v1",orderRouter);



















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