import bcrypt from "bcrypt";
import User from "../models/User.js"
import passport from "./auth.js";
import { Strategy as LocalStrategy } from "passport-local";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    newUser.userID = Date.now();
    await newUser.save();

    res.status(201).json({ message: "Registration successful.", newUser });
    console.log(req.body);
  } catch (err) {
    res.status(500).json({ error: "Failed to register user." });
  }
};

passport.use(
  new LocalStrategy(function (user, password, cb) {
    User.findOne({ name: user })
      .exec()
      .then((user) => {
        if (!user) {
          return cb(null, false);
        }

        bcrypt.compare(password, user.password).then((isMatch) => {
          if (!isMatch) {
            return cb(null, false);
          }
          return cb(null, user);
        });
      })
      .catch((err) => {
        return cb(err);
      });
  })
);

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  User.findById(id, function (err, user) {
    cb(err, user);
  });
});

export const loginUser = (req, res) => {
  res.json(req.user);
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
