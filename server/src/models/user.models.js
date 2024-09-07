import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { transporter } from "../utils/mail.js"
import crypto from "crypto"
// Define the allowed domains
const allowedDomains = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "apple.com",
]
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: [5, "Minimum 5 letters"],
      max: [8, "Maximum 8 letters"],
      lowercase: true,
      unqiue: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unqiue: true,
      trim: true,
      validate: {
        validator: function (v) {
          // Regular expression to extract the domain part of the email
          const domain = v.split("@")[1]
          return allowedDomains.includes(domain) // Validate if the domain is in the allowed list
        },
        message: (props) => `${props.value} is not from a valid domain!`,
      },
    },
    FullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinaryURL
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshTokens: {
      type: String,
    },
    role: {
      type: String,
      enum: ["resident", "admin", "customerSupport"],
    },
    isAuth: {
      type: Boolean,
      default: false,
    },
    MFA_token: {
      type: String, // Temporary MFA token
      required: false,
    },
    MFA_token_expiry: {
      type: Date, // Expiry date of MFA token
      required: false,
    },
  },
  { timestamps: true }
)

UserSchema.pre("save", async function (next) {
  //Encrypt the password before saving info in the DB
  if (!this.isModified("password")) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 10)
  next()
})
UserSchema.methods.triggerMFA = async function () {
  const token = crypto.randomBytes(3).toString("hex") // Generate a 6-character token
  this.MFA_token = token
  this.MFA_token_expiry = Date.now() + 10 * 60 * 1000 // Token valid for 10 minutes

  // Send the OTP email using Nodemailer
  const mailOptions = {
    from: process.env.EMAIL, // Sender address
    to: this.email, // Receiver's email (user's email)
    subject: "Your Authentication OTP Code",
    text: `Your Authentication OTP code is: ${token}. It will expire in 10 minutes.`,
  }

  try {
    await transporter.sendMail(mailOptions) // Send the email
    console.log("MFA OTP sent to email:", this.email)
    this.save() // Save the MFA token and expiry in the database
    return true
  } catch (error) {
    console.error("Error sending MFA OTP:", error)
    throw new Error("Failed to send OTP to email")
  }
}
UserSchema.methods.MFA_auth = async function (token) {
  if (this.MFA_token === token && this.MFA_token_expiry > Date.now()) {
    this.isAuth = true // Mark user as authenticated
    this.MFA_token = undefined // Clear the MFA token
    this.MFA_token_expiry = undefined // Clear the token expiry
    delete this.isAuth, this.MFA_token, this.MFA_token_expiry // Remove the fields from the object
     this.save()
     return true
  } else {
    throw new Error("Invalid or expired MFA token")
  }
}

UserSchema.methods.isPasswordCorrect = async function (password) {
  //Comparing the encrypted password with the passwrod entered by the user
  return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateAccessToken = function () {
  //Generating the access tokens
  return jwt.sign(
    {
      _id: this._id,
      email: this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  )
}

UserSchema.methods.generateRefreshToken = function () {
  ///Generating the refresh tokens
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  )
}

export const User = mongoose.model("User", UserSchema)
