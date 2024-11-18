const express=  require("express")

const router=express.Router();

const {UserAuth}= require("../middlewares/auth")


router.get("/profile", UserAuth, async (req, res) => {
    try {

      //console.log(req.user.firstName);
      
      const user = req.user;
  
      res.send(user);
    }
    
    catch (err) {
      res.status(400).send("ERROR " + err.message);
    }
  });


module.exports = router;
