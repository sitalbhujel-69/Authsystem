import { verifyToken } from "../utils/jwt.js"

export const protectedAuth = async (req,res,next)=>{
  const token = req.cookies.token
  if(!token){
    return res.status(401).json({message:'token not found!'})
  }
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next()

  } catch (error) {
    return res.status(500).json({message:"something went wrong!!"})
  }
}
