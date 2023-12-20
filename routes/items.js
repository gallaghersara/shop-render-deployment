
import express from "express";
import {getItems} from "../controllers/item.js"

const router = express.Router();

router.get("/items", getItems);

export default router;