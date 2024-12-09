const express = require("express");
const validator = require("validator");
const bcrypt = require("bcrypt");

const router = express.Router();
const { validateEditProfile } = require("../utils/validation");
const { validateProfileEditData } = require("../utils/validation.js");
const { UserAuth } = require("../middlewares/auth");
const User = require("../models/user.js");

router.get("/profile/view", UserAuth, async (req, res) => {
  try {
    //console.log(req.user.firstName);

    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});

router.patch("/profile/edit", UserAuth, async (req, res) => {
  try {
    if (!validateEditProfile(req)) {
      throw new Error(" Invalid Edit Request");
    }
    
    // !validate req body data
    validateProfileEditData(req);

    const loggedInUser = req.user;
    // console.log(loggedInUser);
    // ! first way to update
    // ? Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    // ! second way to update
    Object.assign(loggedInUser, req.body);

    await loggedInUser.save();

    //  res.send(`${loggedInUser.firstName} profile updated successfully`);
    res.json({
      message: `${loggedInUser.firstName},your profile updated successfully`,
      data: loggedInUser,
    });
    //console.log(loggedInUser);
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

router.patch("/profile/Password", UserAuth, async (req, res) => {
  try {
    const user = req.user;

    const { newPassword } = req.body;

    //console.log(newPassword);

    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("password is not strong");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    // user.password=newPassword;

    await user.save();

    res.status(200).send("password updated successfully");
  } catch (err) {
    res.status(500).send("ERROR : " + err.message);
  }
});

module.exports = router;
