import Item from "../models/Item.js";

export const getItems = async (req, res, next) => {
    try {
      const items = await Item.find();
      res.status(200).json({
        success: true,
        items,
      });
    } catch (error) {
      console.log(error);
      return next(error);
      //  res.status(500).json({ error: "Failed to fetch items" });
    }
  };

