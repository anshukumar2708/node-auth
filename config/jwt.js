const jwt = require("jsonwebtoken");

const createJwt = (user) => {
  const token = jwt.sign({ userID: user?._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

module.exports = createJwt;
