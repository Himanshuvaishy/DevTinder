const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
const app = express();
const { validationSignUp } = require("./utils/validation.js");
// ! this is a middleware which covert our json into js object
app.use(express.json());
app.use(cookieParser());

const { UserAuth } = require("../middlewares/auth.js");

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid Credential ");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // ? create token

      const token = await jwt.sign({ _id: user._id }, "DEV@TINDER",{expiresIn:"1d"});
      // console.log(token);

      // ? add token to cokies and send back the respone the user

      res.cookie("token", token,{expires : new Date(Date.now() + 8 * 3600000)});

      res.send("login successfully");
    } else {
      throw new Error("Invalid Credential");
    }
  } catch (err) {
    res.send("ERROR " + err.message);
  }
});

app.get("/profile", UserAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});


app.post("/sendConnectionRequest", UserAuth,  async (req,res)=>{

  const user=req.user;

  res.send(`${user.firstName} sent the connection request`);

})


connectDB()
  .then(() => {
    console.log("connect DB successsful");
    app.listen(7777, () => {
      console.log("app is listening");
    });
  })
  .catch((err) => {
    console.log(err);
  });
