import { Router } from "express";
import { loginUser, logoutUser, registerUser, validate, verfiyOtp, verifyCheck } from "../controllers/user.controller.js";
import { protectedAuth } from "../middlewares/protected.js";

const route = Router()

route.post('/register',registerUser);
route.post('/verify-otp',verfiyOtp)
route.get('/verify-check',verifyCheck)
route.get('/validate',validate)
route.post('/login',loginUser)
route.get('/logout',protectedAuth,logoutUser)

export default route