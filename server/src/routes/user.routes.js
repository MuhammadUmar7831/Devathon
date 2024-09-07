import { Router } from "express";
import { registerUser,loginUser} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";


const router = Router();


router.route("/register").post(registerUser)
router.route("/login").post(loginUser) 

//secured routes
router.route("/logout").post(verifyJWT,loginUser)

export default router