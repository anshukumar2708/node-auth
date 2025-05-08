const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    tc: { type: Boolean, required: true, trim: true },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
