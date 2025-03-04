const express = require("express");
const router = express.Router();
const path = require("path");
const axios = require("axios");

//products.html page
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/products.html"));
});

router.get("/getproducts", async (req, res) => {
  const url = "https://fakestoreapi.com/products";
  try {
    const response = await axios.get(url);
    const data = await response.data;
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: "500",
      message: "error fetching data",
    });
  }
});

module.exports = router;
