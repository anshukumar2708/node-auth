const jwt = require("jsonwebtoken");

exports.AuthMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ status: "fail", message: "Unauthorized user" });
    }
    const token = authHeader.split(" ")[1];
    const tokenVerify = jwt.verify(token, process.env.JWT_SECRET);
    req.user = tokenVerify;
    next();
  } catch (error) {
    console.log("JWT error:", error.message);
    return res
      .status(401)
      .json({ status: "fail", message: "Invalid or expired token" });
  }
};
