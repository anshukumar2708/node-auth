const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const ConnectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const StartServer = async () => {
  try {
    await ConnectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
    console.log("Server Start Successfully");
  } catch (error) {
    console.log("Server Not Start");
  }
};

StartServer();
