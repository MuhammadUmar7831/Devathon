import jwt from "jsonwebtoken"
import {User} from "../models/user.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"


const isAdmin = asyncHandler(async(req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    if(user.role !== "admin"){
        throw new ApiError(401,"Unauthorized - Admin only")
    }
    next()
})