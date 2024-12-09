const jwt = require("jsonwebtoken");

const User = require("../models/user");

const UserAuth = async  (req, res, next) => {
  // read  coolkies
  try{
    const cookies = req.cookies;
  const { token } = cookies;

  if (!token) {
    throw new Error("token is not valid!!!!!");
  }

  const decodedData =  await jwt.verify(token, "DEV@TINDER");

  const { _id } = decodedData;

  const user =  await User.findById(_id);
  //console.log(user);
  

  if (!user) {
    throw new Error("user is not found");
  }
   // attaching user into request 
  req.user = user;
  next();
}catch(err){
  res.send("ERROR " + err.message);
  

}

  }
module.exports = { UserAuth };
