import express from "express";
import passport from "../controllers/auth.js";
import { getUsers, createUser, loginUser } from "../controllers/user.js";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", createUser);

router.get("/users", getUsers);

router.post(
  "/login",
  (req, res, next) => {
    console.log("reached passport");
    next();
  },
  passport.authenticate(
    new LocalStrategy(function (user, password, cb) {
      console.log("reached passport");
      User.findOne({ name: user })
        .exec()
        .then((user) => {
          console.log(user);
          console.log("reached passport2");
          if (!user) {
            console.log("No user with that email");
            return cb(null, false);
          }

          bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch) {
              console.log("Password incorrect");
              return cb(null, false);
            }
            console.log("login successful");
            return cb(null, user);
          });
        })
        .catch((err) => {
          console.log("reached passport3");
          return cb(err);
        });
    }),
    {
      // successRedirect: "/",
      // failureRedirect: "/",
      failureRedirect: "/login",
      // failureFlash: true,
    }
  ),
  (req, res) => {
    res.json(req.user);
  }
);

function checkAuthenticated(req,res,next){
  if (req.isAuthenticated()){
    return next()
  }
  res.redirect('/faileddd')
}
function checkNotAuthenticated(req,res,next){
  if (req.isAuthenticated()){
    return res.redirect('/')
  }
  next()
}

router.post('/logout', checkAuthenticated, function(req, res, next){
  req.logout(function(err) {
    // if (err) { return next(err); }
    console.log("logout succes");
    res.redirect('/login');
  });
});

export default router;
