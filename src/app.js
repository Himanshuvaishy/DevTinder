const express = require("express");
const app = express();
  const {adminAuth,UserAuth}=require("../middlewares/auth");

//app.use("/admin",adminAuth);
// app.use("/user",UserAuth);

app.get("/admin/getallUser",adminAuth,(req,res,next)=>{

  res.send("all data get");

})

app.get("/user/allData", UserAuth,(req,res)=>{
  res.send("user response is getting")

})

app.get("/user/login",(req,res,next)=>{

  res.send("user is successfully logged in");

})

app.get("/admin/DeleteUser",adminAuth,(req,res)=>{
  res.send("Delete a User");

})



app.listen(7777, () => {
  console.log("app is listening");
});
