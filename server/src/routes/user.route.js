import { Router } from "express";
import { loginUser, registerUser, validate, verfiyOtp, verifyCheck } from "../controllers/user.controller.js";

const route = Router()

route.post('/register',registerUser);
route.post('/verify-otp',verfiyOtp)
route.get('/verify-check',verifyCheck)
route.get('/validate',validate)
route.post('/login',loginUser)

export default route