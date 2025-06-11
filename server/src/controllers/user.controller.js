import { User } from "../models/user.model.js";
import { generateToken, verifyToken } from "../utils/jwt.js";
import { sendEmail } from "../utils/sendEmail.js";
import bcrypt from 'bcrypt'

const registerUser = async (req,res)=>{
  const {email,password,fullName} = req.body;
  try {
    const doExist = await User.findOne({email});
    if(doExist){
      return res.status(400).json({message:'user already exists with this email'})
    }
    const otp = Math.floor(100000+Math.random()*900000).toString();
    const user = await User.create({
      email,
      fullName,
      password,
      otp,
      otpExpiry:Date.now()+5*60*1000
    })
    sendEmail(email,otp,`this otp will expires in 5 minutes`);
    return res.status(201).json({
      message:'user created',
      data:user
    })
  } catch ({error}) {
    return res.status(500).json({
      message:'something went wrong while creating user'
    })
  }
}

const verifyCheck = async (req,res)=>{
  const {email} = req.query;
  try {
    const user = await User.findOne({email});
    if(!user || user.isVerified || !user.otp || user.otpExpiry<Date.now()){
      return res.status(403).json({valid:false})
    }
    return res.status(200).json({valid:true})
  } catch (error) {
    return res.status(500).json({valid:false,message:"something went wrong"})
  }
}

const verfiyOtp = async (req,res)=>{
  const {email,otp} = req.body;
  try {
    const user = await User.findOne({email});
    if(!user){
      return res.status(404).json({message:"wrong email"})
    }
    console.log(user)
    const isValid =await  bcrypt.compare(otp,user.otp)
    console.log(isValid)
    if(!isValid || user.otpExpiry<Date.now()){
      console.log(1)
      return res.status(401).json({message:"invalid token or token expired"})
    }
    user.isVerified = true
    user.otp = undefined
    user.otpExpiry =undefined
    await user.save()
    return res.status(200).json({message:'user verified',data:user})
  } catch (error) {
    console.error(error)
    return res.status(500).json({message:"error occured when verifying token"})
  }
}

const validate  = async (req,res)=>{
  const {token} = req.cookies
  if(!token){
    return res.sendStatus(401)
  }
  try {
    const user = verifyToken(token)
    return res.json({user})

  } catch (error) {
    return res.sendStatus(403)
  }
}
// const validate = (req, res) => {
//   if(req.isAuthenticated()){
//     return res.json({user:req.user})
//   }
//   // User is authenticated, you can send user info
//   return res.sendStatus(401);
// }

const loginUser = async (req,res)=>{
  const {email,password} = req.body;
  try {
    const user = await User.findOne({email});
    if(!user){
      return res.status(404).json({message:"user not found!"})
    }
    const isValid = await bcrypt.compare(password,user.password);
    if(!isValid){
      return res.status(401).json({message:"invalid password"});
    }
    const token = generateToken(user);
    return res.status(200).cookie('token',token,{
      httpOnly:true,
      secure:false,
      sameSite: 'lax'
    }).json({
      message:"user logged in successfully!"
    })
  } catch (error) {
    return res.status(500).json({message:"something went wrong while logging in!"})
  }
}

const logoutUser = async (req,res)=>{
  res.clearCookie('token',{
    httpOnly:true,
    secure:false,
    sameSite:'lax'
  })
  return res.json({message:"user logged out successfully"})
}

export {registerUser,verfiyOtp,validate,verifyCheck,loginUser,logoutUser}