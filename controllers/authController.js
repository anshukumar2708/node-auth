const userModel = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const createJwt = require("../config/jwt");
const SendEmail = require("../config/node-mail");

exports.RegisterUser = async (req, res) => {
  try {
    const { full_name, email, password, confirm_password, tc } = req.body;

    if (!full_name || !email || !password || !confirm_password || !tc) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }

    if (password !== confirm_password) {
      return res.status(400).json({
        status: "fail",
        message: "Password and confirm password do not match",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "Email already registered",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      full_name,
      email,
      password: hashPassword,
      tc,
    });
    const userData = await user.save();
    const token = createJwt(userData);
    const userObj = userData.toObject();
    delete userObj.password;
    delete userObj.__v;

    await SendEmail(email);

    res.status(201).json({
      status: "success",
      message: "Registration Successful",
      user: userObj,
      token,
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.SignInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "fail", message: "All fields are required" });
    }
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid credential" });
    }
    const isPasswordMatched = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatched) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid credential" });
    }
    const token = createJwt(existingUser);
    const userData = existingUser.toObject();
    delete userData.password;
    return res.json({
      status: "success",
      message: "Login successful",
      user: userData,
      token,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json("internal server error");
  }
};

exports.ChangePassword = async (req, res) => {
  try {
    const { current_password, new_password, new_confirm_password } = req.body;
    if (!current_password || !new_password || !new_confirm_password) {
      return res
        .status(401)
        .json({ status: "fail", message: "All fields are required" });
    }
    if (new_password !== new_confirm_password) {
      return res.status(4001).json({
        status: "fail",
        message: "new password new confirm password not matched",
      });
    }
    const currentUser = await userModel.findById(req?.user?.userID);
    if (!currentUser) {
      return res
        .status(401)
        .json({ status: "fail", message: "Not valid user" });
    }
    const isPassMatch = await bcrypt.compare(
      current_password,
      currentUser?.password
    );
    if (!isPassMatch) {
      return res
        .status(401)
        .json({ status: "fail", message: "email & password not correct" });
    }
    const hashPassword = await bcrypt.hash(String(new_password), 10);
    await userModel.findByIdAndUpdate(req.user.userID, {
      $set: { password: hashPassword },
    });
    return res.json({
      status: "success",
      message: "Password change successfully",
    });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ status: "fail", message: "internal server error" });
  }
};
