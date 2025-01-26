const express = require("express");
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

connectDB()
  .then(() => {
    console.log("connect DB successsful");
    app.listen(7777, () => {
      console.log("app is listening");
    });
  })
  .catch((err) => {
    console.log(err);
  });
