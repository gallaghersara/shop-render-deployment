import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from './config/db.js'
import errorHandler from './middleWares/error.js'
import userRoutes from './routes/users.js'

connectDB()

dotenv.config();
const {MONGO_URI, PORT, DB_USER,DB_PASS,DB_HOST,DB_NAME,SESSION_SECRET} = process.env;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", userRoutes)

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

