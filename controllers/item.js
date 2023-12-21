import Item from "../models/Item.js";

export const getItems = async (req, res) => {
  const products = await Item.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No f Product found" });
  }
}
// export const getItems = async (req, res, next) => {
//     try {
//       const products = await Item.find();
//       res.status(200).json({
//         success: true,
//         products,
//       });
//     } catch (error) {
//       console.log(error);
//       return next(error);
//       //  res.status(500).json({ error: "Failed to fetch items" });
//     }
//   };

