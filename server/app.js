const express = require("express");
const app = express();
const port = 3000;

//const transactionController = require("./controller/transaction");
const recipeController = require("./controller/recipe");

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//app.use("/transaction", transactionController);
app.use("/recipe", recipeController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});