import express from "express";
// import {getUsers} from "../controllers/user.js"
import User from "../models/User.js";

// import {
//         // createUser,
//         getUsers
//     } from "../controllers/user.js";
// const {
//     createUser,
//     getUsers
// } = 

const router = express.Router();

router.get("/users", (req, res) => {
    User.find()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        console.error("Failed to fetch items:", err);
        res.status(500).json({ error: "Failed to fetch items" });
      });
  });
  
// router.post("/", createUser);

// router.get("/", getUsers);

export default router;