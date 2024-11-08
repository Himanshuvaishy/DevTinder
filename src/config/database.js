const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Himanshu:1234@cluster0.xbqv2.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
