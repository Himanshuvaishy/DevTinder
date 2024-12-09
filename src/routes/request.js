const express = require("express");

const router = express.Router();
const ConnectionRequest = require("../models/connectionRequest.js");
 const User=require("../models/user.js")

const { UserAuth } = require("../middlewares/auth");

router.post("/request/send/:status/:toUserId", UserAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;


    //console.log(status,toUserId);

    const allowedStatus=["ignored","interested"];

    if(!allowedStatus.includes(status)){

      // ! I can also throw an error here
      return res.status(400).json({message:"Invalid status type"+status})

    }

    const existingConnectionRequest= await ConnectionRequest.findOne({
      $or:[
        {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId:fromUserId}
      ]
    })
    if(existingConnectionRequest){
     return  res.status(400).json({message:"Connection request already exists"})
    }

    const toUser= await User.findById(toUserId) ;

    if(!toUser){
      return res.status(400).json({message : "user not found in DB"})

    }

    if(toUserId == fromUserId){
      throw new Error("can not send reuest to yourself")
    }
    

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });
    const data = await connectionRequest.save();
    res.json({
      message: `${req.user.firstName} is ${status}  ${toUser.firstName}  id`,
      data,
    });
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});

module.exports = router;
