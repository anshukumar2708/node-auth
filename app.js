const express = require("express");
const authRouter = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to home page</h1>");
});

app.use("/auth", authRouter);

module.exports = app;
