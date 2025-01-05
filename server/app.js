// Importing the express module and create an express application instance
// Defined port number to 8000 so that there would be no conflict with ReactJS which will be 3000
const cors = require("cors"); // Import cors
const express = require("express");
const app = express();
const port = 8000;

// Importing recipeController to handle all routes related to recipes
const recipeController = require("./controller/recipe");

app.use(cors({
  origin: "http://localhost:3000",
  method: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Middleware to parse incoming JSON requests
app.use(express.json()); 

// Middleware to parse incoming URL-encoded form data
app.use(express.urlencoded({ extended: true })); 

// Define the root route ("/") of the app where "Hello World!" is a response
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Route for all requests related to recipes where recipe-related logic is implemented
app.use("/recipe", recipeController);

// Start the server and listne on the specified port (8000)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});