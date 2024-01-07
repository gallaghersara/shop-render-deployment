import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import session from 'express-session';

import dotenv from "dotenv";

import connectDB from './config/db.js'
import errorHandler from './middleWares/error.js'
import userRoutes from './routes/users.js'
import itemRoutes from './routes/items.js'
import passport from "passport";
import { isAuthenticated } from "./middleWares/auth.js";

connectDB()

dotenv.config();
const PORT=5000
const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static('client/build'))


app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secretsessionkey',
  // secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.session())    

app.use("/", userRoutes)
app.use("/items", isAuthenticated, itemRoutes)

app.get("*",(req, res) => {
    res.sendFile(__dirname+ "/client/build/index.html")
  } )
  
app.use("/", (req,res)=>{
    return res.json({
        message:"welcom to the server"
    })
})

app.use(errorHandler);

const server = app.listen(PORT, () =>
console.log(`server start listening on ${PORT}`)
);

process.on("unhandledRejection", (error, promise)=>{
    console.log(`Logged Error: ${error}`);
    server.close(()=> process.exit(1))
});

