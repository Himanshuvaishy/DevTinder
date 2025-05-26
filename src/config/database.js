const mongoose = require("mongoose");
console.log( process.env.DB_CONNECTION_KEY);


const connectDB = async () => {
  await mongoose.connect(
    process.env.DB_CONNECTION_KEY
    
  );
};

module.exports = connectDB;
