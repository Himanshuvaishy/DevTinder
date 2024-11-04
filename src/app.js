const express=require("express");

const app=express();

app.use("/hello",(req,res)=>{
    //console.log("hellow nodejs");

    res.send("hello nodejs")
    
})

// app.use("/test",(req,res)=>{
//     res.send("I am test my api");

// })

app.listen(7777,()=>{
    console.log("app is listening");
    
})