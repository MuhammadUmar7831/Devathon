import { Router } from "express"
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getUser,
} from "../controllers/user.controllers.js"
import { verifyJWT } from "../middlewares/verifyJWT.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/get-user").get(verifyJWT, getUser)
router.route("/update-user").put(verifyJWT, updateUser)

export default router
