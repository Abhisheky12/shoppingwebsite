const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { main } = require("./config/db")
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

//importing route
const authRouter=require("./route/userRoute");
const produtRouter=require("./route/productRoute");



//running frontend and backend on sameport
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Expires", "Pragma"],
        credentials: true,
    })
);



//middleware

app.use(cookieParser());
app.use(express.json()); // Parses incoming JSON request bodies and makes them available as req.body.


// app.use("/user",authRouter);
app.use("/product",produtRouter);



















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