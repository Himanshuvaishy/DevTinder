const express = require("express");
require('dotenv').config()
const cookieParser = require("cookie-parser");
const path = require('path');

const cors=require("cors");


const connectDB = require("./config/database.js");
const app = express();
app.use('/public', express.static(path.join(__dirname, 'public')));


// ! this is a middleware which covert our json into js object
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],

}));

const authRouter=require("./routes/auth.js");
const  profileRouter =require("./routes/profile.js")
const  RequestRouter =require("./routes/request.js");
const userRouter = require("./routes/user.js");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",RequestRouter);
app.use("/",userRouter)

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    console.log("✅ Connected to MongoDB successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB", err);
    process.exit(1); // Optional: exit app if DB connection fails
  });
