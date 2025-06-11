import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import userRoute from "./routes/user.route.js";
import "./auth/google.js";
import { validate } from "./middlewares/validate.js";

export const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(
//   session({
//     secret: "mysecret",
//     resave: false,
//     saveUninitialized: true,
//   })
// );
app.use(passport.initialize());
// app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
  })
);

app.use("/api/users", userRoute);

app.get("/google", (req, res) => {
  res.send(`<a href='/auth/google'>Login with google</a>`);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session:false,
    failureRedirect: "/google",
  }),
  (req, res) => {
     const { token } = req.user;  
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax'  
    });
    res.redirect('http://localhost:5173/home');
  }
);

app.get("/profile",validate, (req, res) => {
  
  res.send(`<h1>${req.user.displayName}</h1>
      <a href="/logout">logout</a>
      `);
});

app.get("/logout",validate, (req, res) => {
  req.logout(() => {
    res.redirect("/google");
  });
});
