const express = require("express");
const app = express();


app.get("/user/:id/:firstName/:lastName",(req,res)=>{
    //fetching data
    res.send({firstName:"Himanshu",lastName:"vaishy"});

      console.log(req.query);// print query 
    console.log(req.params);// handle dyanamic route 
    
    
})




app.post("/user",(req,res)=>{
    //saving data 
    res.send("data is saved to database");
})

app.listen(7777, () => {
  console.log("app is listening");
});
