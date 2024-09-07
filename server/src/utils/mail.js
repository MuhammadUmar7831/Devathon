import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL, // Replace with your email
    pass: process.env.EMAIL_PASS, // Replace with your password or app-specific password
  },
})
