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

    await user.save();
    res.send("data saved successfully");
  } catch (err) {
    res.status(404).send("ERROR :" + err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid Credential ");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // ? create token

      const token = await user.getJWT();
      // console.log(token);

      // ? add token to cokies and send back the respone the user

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send("login successfully");
    } else {
      throw new Error("Invalid Credential");
    }
  } catch (err) {
    res.send("ERROR " + err.message);
  }
});

module.exports = router;
