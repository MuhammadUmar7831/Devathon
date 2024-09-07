import { User } from "../models/user.models.js"
import { Bills } from "../models/all.models.js"
import { Consumption } from "../models/all.models.js"
import { Rate } from "../models/all.models.js"
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
const { email, password, FullName } = req.body.user
  const role = "resident"
  const avatar = "/user.png"
  const username = FullName


  let FoundUser = await User.findOne({ email })

  if (FoundUser) {
    throw new ApiError(400, "Failed - User already exists")
  }

  const user = await User.create({
    email,
    password,
    FullName,
    username,
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

  const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)
  const options = {
    httpOnly: true,
    secure: true,
  }

  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
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

export const logoutUser = asyncHandler(async (req, res) => {
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

export const getUser = asyncHandler(async (req, res) => {
  const id = req.user?._id

  const user = await User.findById(id)

  if (!user) {
    throw new ApiError(404, "User not found")
  }

  return res.status(200).json(new ApiResponse(200, user, "User found"))
})
export const updateUser = asyncHandler(async (req, res) => {
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

export const getBills = asyncHandler(async (req, res) => {
  const id = req.user?._id

  const user = await User.findById(id)

  if (!user) {
    throw new ApiError(404, "User not found")
  }

  const bills = await Bills.aggregate([
    {
      // Lookup the consumption data related to the user
      $lookup: {
        from: "consumptions", // The name of the 'Consumption' collection in MongoDB
        localField: "consumption",
        foreignField: "_id",
        as: "consumptionDetails",
      },
    },
    {
      // Unwind the consumption details array
      $unwind: "$consumptionDetails",
    },
    {
      // Match only the bills where the userID in consumption matches the current user ID
      $match: {
        "consumptionDetails.userID": user._id,
      },
    },
    {
      // Project the necessary fields in the response
      $project: {
        _id: 1,
        status: 1,
        dueDate: 1,
        total: 1,
        "consumptionDetails.month": 1,
        "consumptionDetails.units": 1,
      },
    },
  ])

  if(!bills.length){
    return res.status(404).json({message: "No bills found"})
  }

  return res.status(200).json(new ApiResponse(200, bills, "Bills found"))
})

export const getAdminBills = asyncHandler(async (req, res) => {
  const id = req.user?._id

  // Find the user by ID
  const user = await User.findById(id)

  if (!user) {
    throw new ApiError(404, "User not found")
  }

  // Check if the user is an admin
  if (user.role !== "admin") {
    throw new ApiError(403, "Unauthorized")
  }

  // Pagination logic
  const page = parseInt(req.query.page) || 1 // default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 10 // default to 10 bills per page
  const skip = (page - 1) * limit

  // Fetch bills with skip and limit
  const bills = await Bills.find({}).skip(skip).limit(limit)

  // If no bills are found
  if (!bills.length) {
    return res.status(404).json({ message: "No bills found" })
  }

  // Get the total count of bills for pagination purposes
  const totalBills = await Bills.countDocuments()

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {
          totalBills,
          currentPage: page,
          totalPages: Math.ceil(totalBills / limit),
          bills,
        },
        "Bills found"
      )
    )
})


export const setUserConsumption = asyncHandler(async (req, res) => {
  const {id,units,month} = req.body

  const user = await User.findById(id)

  if(!user){
    throw new ApiError(404,"User not found")
  }

  const consumption = await Consumption.create({
    userID: user._id,
    units,
    month
  })

  if(!consumption){
    throw new ApiError(500,"Failed - Consumption not set")
  }
})


export const setRate = asyncHandler(async (req, res) => {
  const {perunit,above100,above200,above300,latePayment} = req.body

  const rate = await Rate.create({
    perunit,
    above100,
    above200,
    above300,
    latePayment
  })

  if(!rate){
    throw new ApiError(500,"Failed - Rate not set")
  }
})

export const generateBill = asyncHandler(async (req, res) => {
  const { userID, month } = req.body;

  const checkAdmin = await User.findById(req.user?._id)

  if(checkAdmin.role !== "admin"){
    throw new ApiError(403,"Unauthorized Action")
  }

  // Find the consumption data for the user and the given month
  const userConsumption = await Consumption.findOne({ userID, month });

  if (!userConsumption) {
    throw new ApiError(404, "User consumption not found for the specified month");
  }

  // Find the rate details
  const rateDetails = await Rate.findOne();
  if (!rateDetails) {
    throw new ApiError(404, "Rate not found");
  }

  const { perunit, above100, above200, above300, latePayment } = rateDetails;

  // Calculate the total based on consumption
  let total = 0;

  if (userConsumption.units <= 100) {
    total = userConsumption.units * perunit;
  } else if (userConsumption.units > 100 && userConsumption.units <= 200) {
    total = userConsumption.units * perunit * above100;
  } else if (userConsumption.units > 200 && userConsumption.units <= 300) {
    total = userConsumption.units * perunit * above200;
  } else {
    total = userConsumption.units * perunit * above300;
  }

  // Late payment logic (assuming dueDate exists in the future for simplicity)
  const today = new Date();
  const dueDate = new Date(`${month}-10`); // Assuming bill is due on the 15th of the month

  let latePaymentTotal = total;
  if (today > dueDate) {
    latePaymentTotal = total + (total * latePayment);
  }

  // Create and save the bill
  const newBill = await Bills.create({
    consumption: userConsumption._id,
    status: 'unpaid',
    dueDate, // Set dueDate to a calculated value or a default value
    total: latePaymentTotal,
  });

  // Send the generated bill as a response
  return res.status(201).json(new ApiResponse(201, newBill, "Bill generated successfully"));
});


