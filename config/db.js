const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

const ConnectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database Connected");
  } catch (error) {
    console.log("Database not connected");
  }
};

module.exports = ConnectDB;
