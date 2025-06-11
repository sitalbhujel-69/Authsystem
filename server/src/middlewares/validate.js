export const validate = (req,res,next)=>{
  if(req.isAuthenticated()){
    return next()
  }
  return res.redirect('/google')
}