const express = require("express");
const AuthController = require("../controllers/authController");
const { AuthMiddleware } = require("../middleware/auth-middleware");

const Router = express.Router();

Router.post("/change-password", AuthMiddleware);

Router.post("/register", AuthController.RegisterUser);
Router.post("/sign_in", AuthController.SignInUser);

// protected routes
Router.post("/change-password", AuthController.ChangePassword);

module.exports = Router;
