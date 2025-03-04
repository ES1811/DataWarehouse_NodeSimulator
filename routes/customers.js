const express = require("express");
const router = express.Router();
const path = require("path");
const axios = require("axios");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/customers.html"));
});

router.get("/getcustomers", async (req, res) => {
  const personNumber = 400;
  const url = `https://randomuser.me/api/?results=${personNumber}`;
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

/*
let data;
axios
  .get("https://randomuser.me/api/?results")
  .then((response) => (data = response.data));

router.get("/getcustomers", async (req, res) => {
  try {
    res.status(200).json(data)
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});*/

module.exports = router;
