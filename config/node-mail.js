const dotenv = require("dotenv");
dotenv.config();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const SendEmail = async (email, otp) => {
  try {
    const info = await transporter?.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Email Verification - OTP",
      text: `Your OTP for verification is: ${otp}`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Email Verification</h2>
          <p>Your OTP is:</p>
          <h1 style="color: #2e6c80;">${otp}</h1>
          <p>This OTP will expire in 60 minutes.</p>
        </div>
      `,
    });
  } catch (error) {
    console.log("email send error", error);
  }
};

module.exports = SendEmail;
