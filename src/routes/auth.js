const express = require("express");

const { validationSignUp } = require("../utils/validation.js");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    // ! validation
    validationSignUp(req);
    const { firstName, lastName, email, password } = req.body;
    // ! Encrypt the  password

    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

     const savedUser= await user.save();
     const token = await savedUser.getJWT();

      // Add the token to cookies and send the user data
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000), // 8 hours
        httpOnly: true, // Secure the cookie
      });

    res.json({message:"User Added Successful",data:savedUser});
  } catch (err) {
    res.status(404).send("ERROR :" + err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: "Invalid Credential" });
    }

    // Validate the password
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // Create a token
      const token = await user.getJWT();

      // Add the token to cookies and send the user data
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000), // 8 hours
        httpOnly: true, // Secure the cookie
      });

      return res.status(200).json(user); // Success response
    } else {
      return res.status(401).json({ message: "Invalid Credential" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" }); // Generic server error
  }
});


router.post("/logout", async (req,res)=>{
  res.cookie("token", null, {
    expires: new Date(Date.now())
   
  });
  res.send("Logout Successful!!");
});



module.exports = router;
