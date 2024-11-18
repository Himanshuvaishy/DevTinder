const express=require("express")

const router=express.Router();

 const { UserAuth }=require("../middlewares/auth")

router.post("/sendConnectionRequest", UserAuth,  async (req,res)=>{

    const user=req.user;
  
    res.send(`${user.firstName} sent the connection request`);
  
  })



module.exports=router;