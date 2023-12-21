
import express from "express";
import {getItems} from "../controllers/item.js"
import Item from "../models/Item.js";

const router = express.Router();

router.get("/items", getItems);

router.get("/product/:id", async (req, res) => {
    // try {
    let result = await Item.findOne({ _id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.send({ result: "No record found." });
    }
    // } catch (error) {
    //   console.error("Error fetching product details:", error);
    //   res.status(500).send({ error: "Internal server error" });
    // }
  });


  router.get("/search/:key", async (req, res) => {
    let result = await Item.find({
      $or: [
        {
          title: { $regex: req.params.key },
        },
        {
          category: { $regex: req.params.key },
        },
      ],
    });
    res.send(result);
  });
export default router;