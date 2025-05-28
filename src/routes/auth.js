const express = require("express");

const { validationSignUp } = require("../utils/validation.js");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const bcrypt = require("bcrypt");

const router = express.Router();

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  expires: new Date(Date.now() + 8 * 3600000), // 8 hours
  httpOnly: true,
  secure: isProduction,           // secure only in prod (https)
  sameSite: isProduction ? "None" : "Lax"  // cross-site in prod, lax in dev
};

router.post("/signup", async (req, res) => {
  try {
    validationSignUp(req);
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({ firstName, lastName, email, password: passwordHash });
    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    res.cookie("token", token, cookieOptions);

    res.json({ message: "User Added Successful", data: savedUser });
  } catch (err) {
    res.status(404).send("ERROR :" + err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) return res.status(401).json({ message: "Invalid Credential" });

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid Credential" });

    const token = await user.getJWT();

    res.cookie("token", token, cookieOptions);

    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});




router.post("/logout", async (req,res)=>{
  res.cookie("token", null, {
    expires: new Date(Date.now())
   
  });
  res.send("Logout Successful!!");
});



module.exports = router;
