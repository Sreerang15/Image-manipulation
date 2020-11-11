const express = require("express");
const userRouter = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

//EXPRESS CONFIGURATION
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRouter);

//added
module.exports = app;
