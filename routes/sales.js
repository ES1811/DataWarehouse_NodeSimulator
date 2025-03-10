const express = require("express");
const path = require("path");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/sales.html"));
});

//create an empty datawareHouse
let datawareHouse = [];

//fetch and payload json
router.get("/getsales", async (req, res) => {
  const customersURL = "http://localhost:3000/customers/getcustomers";
  const productsURL = "http://localhost:3000/products/getproducts";
  datawareHouse = []; //this will be populated by transactions

  try {
    //use axios
    //const customerData = await axios.get(customersURL);
    //const productData = await axios.get(productsURL);

    //must use Promise to fetch multiple backend urls
    const [customerData, productData] = await Promise.all([
      axios.get(customersURL),
      axios.get(productsURL),
    ]);

    //get the results
    const customers = await customerData.data.results;
    const products = await productData.data;
    //check if data is correct
    //console.log(customers[2].name.first, products[3].title);

    const numberTransactions = 500;
    const productNumber = products.length;
    const customerNumber = customers.length;

    //transactions
    for (var i = 0; i < numberTransactions; i++) {
      let purchaseNumber = Math.floor(Math.random() * 10) + 1;

      let randomCustomer =
        customers[Math.floor(Math.random() * customerNumber)];
      let randomProduct = products[Math.floor(Math.random() * productNumber)];
      //console.log(`transaction number: ${i} ------ ${randomCustomer.name.first} --- random product ${randomProduct.title}`)

      //filter? :D yay it works!
      if (randomCustomer.gender == "male") {
        randomProduct.category = "men's clothing";
      } else if (randomCustomer.gender == "female") {
        randomProduct.category = "women's clothing";
      }

      let randomTransaction = {
        id: i,
        customerName: `${randomCustomer.name.first} ${randomCustomer.name.last}`,
        productName: randomProduct.title,
        productPrice: randomProduct.price,
        //productAmount: 1, //let us create it dynamically
        productAmount: purchaseNumber,
        totalPayment: randomProduct.price * purchaseNumber,
        productCategory: randomProduct.category,
        customerGender: randomCustomer.gender,
        customerCity: randomCustomer.location.city,
        customerState: randomCustomer.location.state,
        customerCountry: randomCustomer.location.country,
      };
      //push to the warehouse
      datawareHouse.push(randomTransaction);
    }

    res
      .status(200)
      .json({ statusCode: "200", message: "success", datawareHouse });
  } catch (error) {
    res.status(500).json({ statusCode: "500", message: `error ${error}` });
  }
});

router.get("/saveasjson", async (req, res) => {
  //check if customerObject is populated or not
  console.log(datawareHouse);
  if(datawareHouse.length == 0) {
    return res.status(500).json({
      message: "datawarehouse is empty",
    });
  }

  fs.writeFileSync("sales.json", JSON.stringify(datawareHouse, null, 2));
  res.status(200).json({
    statusCode: "200",
    message: "files saved",
    //datawareHouse
  });
});

module.exports = router;
