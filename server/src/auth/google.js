import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import dotenv from 'dotenv'
import { generateToken } from "../utils/jwt.js";
import { User } from "../models/user.model.js";
dotenv.config()
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  async function(accessToken, refreshToken, profile, cb) {
   try {
    let user =await User.findOne({googleId:profile.id})
    if(!user){
       user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        isVerified:true
      });
    }
     const token = generateToken(user)
    return cb(null,{user,token})
   } catch (error) {
    done(error,null)
   }
  }
));

// passport.serializeUser( function(user,done){
//   done(null,user)
// })
// passport.deserializeUser(function(user,done){
//   done(null,user)
// })