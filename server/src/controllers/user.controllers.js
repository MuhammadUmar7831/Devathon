import { User } from "../models/user.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshTokens = refreshToken
    await user.save({ validateBeforeSave: false }) ///saving the user with refresh token

    return { accessToken, refreshToken }
  } catch (error) {
    throw new ApiError(500, "")
  }
}

export const registerUser = asyncHandler(async (req, res, next) => {
  const { email, password, username, FullName, avatar } = req.body
  let { role } = req.body

  let FoundUser = await User.findOne({ email })

  if (FoundUser) {
    throw new ApiError(400, "Failed - User already exists")
  }

  const user = await User.create({
    email,
    password,
    username,
    FullName,
    avatar,
    role,
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -MFA_token -MFA_token_expiry"
  )

  if (!createdUser) {
    throw new ApiError(500, "Failed - User not created")
  }

  //   const auth = await user.triggerMFA()

  //   if(!auth){
  //     throw new ApiError(500,"Failed - Authentication not triggered")
  //   }

  return res
    .status(201)
    .json(new ApiResponse(201, "User created successfully", createdUser))
})

// export const verifyMFA = asyncHandler(async (req, res, next) => {
//     const {token} = req.body

//     const user = await User.findOne({MFA_token: token})

//     if(!user){
//       throw new ApiError(404,"Failed - Invalid Token")
//     }
//     await user.MFA_auth(token)
// })

export const loginUser = asyncHandler(async (req, res, next) => {
  //Get password and username from req.body
  const { password, email } = req.body
  if (!email || !password) {
    throw new ApiError(400, "username or Email is required")
  }
  //validate user
  const user = await User.findOne({
    $or: [{ email }],
  })

  if (!user) {
    throw new ApiError(404, "User doesnot exist")
  }
  //check password
  const isValidPassword = await user.isPasswordCorrect(password)
  if (!isValidPassword) {
    throw new ApiError(401, "Password incorrect")
  }
  //generate access token and refresh token
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  )
  //send cookies
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  const options = {
    httpOnly: true,
    secure: true,
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    )
})

const logoutUser = asyncHandler(async (req, res) => {
  //find user again but how?? use middleware

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshTokens: undefined },
    },
    {
      new: true,
    }
  )

  const options = {
    httpOnly: true,
    secure: true,
  }

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const getUser = asyncHandler(async (req, res) => {
  const id = req.user?._id

  const user = await User.findById(id)

  if (!user) {
    throw new ApiError(404, "User not found")
  }

  return res.status(200).json(new ApiResponse(200, user, "User found"))
})
const updateUser = asyncHandler(async (req, res) => {
  const id = req.user?._id
  const { name, avatar } = req.body

  const user = await User.findByIdAndUpdate(
    id,
    {
      $set: { name, avatar },
    },
    {
      new: true,
    }
  )

  if (!user) {
    throw new ApiError(404, "User not found")
  }

  return res.status(200).json(new ApiResponse(200, user, "User updated"))
})

export default {
  registerUser,
  loginUser,
  logoutUser,
  updateUser
}
