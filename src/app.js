const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
const app = express();

app.post("/signup", async (req, res) => {
  const dummyData = {
    firstName: "Himanshu",
    lastName: "vaishy",
    email: "vaish@83170",
    password: "1234",
  };

  const user = new User(dummyData);

  try {
    await user.save();
    res.send("data saved successfully");
  } catch (err) {
    res.send("something went wrong");
  }
});

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
