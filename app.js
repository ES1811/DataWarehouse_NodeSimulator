const express = require("express");
const PORT = 3000;
const path = require("path");
//add cors
const cors = require("cors");

//import index.js router
const indexRouter = require("./routes/index");
const productsRouter = require("./routes/products");
const customersRouter = require("./routes/customers")

const app = express();

//add views folder
app.use(express.static(path.join(__dirname, "views")));
//add public folder
app.use(express.static(path.join(__dirname,"public")));

//use index router
app.use("/", indexRouter)
//use products router
app.use("/products", productsRouter)
//use customers page
app.use("/customers", customersRouter);

//listen to port
app.listen(PORT, () => {
    console.log(`listening at ${PORT}`);
});

module.exports = app;