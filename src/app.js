const express = require("express");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/database.js");

const app = express();


// ! this is a middleware which covert our json into js object
app.use(express.json());
app.use(cookieParser());


const authRouter=require("./routes/auth.js");
const  profileRouter =require("./routes/profile.js")
const  RequestRouter =require("./routes/request.js")



app.use("/",authRouter);
app.use("/",profileRouter);









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
