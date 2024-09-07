import { Router } from "express"
import { verifyJWT } from "../middlewares/verifyJWT.js"
import { registerUser,loginUser,logoutUser,updateUser,getUser,getBills,getAdminBills,generateBill} from "../controllers/user.controllers.js";



const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/get-user").get(verifyJWT,getUser)
router.route("/update-user").put(verifyJWT,updateUser)
router.route("/get-bills").put(verifyJWT,getBills)
router.route("/get-admin-bills").put(verifyJWT,getAdminBills)
router.route("/generate-bill").post(verifyJWT,generateBill)



export default router
