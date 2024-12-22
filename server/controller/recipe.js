// Importing Express.js to create routing and manage HTTP requests 
const express = require("express");
// Creating a router instance for handling routes
const router = express.Router();

// Importing handler functions for each route (business logic is in the abl folder)
const GetRecipe = require("../abl/category/getRecipe");
const ListRecipe = require("../abl/category/listRecipe");
const CreateRecipe = require("../abl/category/createRecipe");
const UpdateRecipe = require("../abl/category/updateRecipe");
const DeleteRecipe = require("../abl/category/deleteRecipe");

// Defining routes and associating them with their respective handlers
router.get("/get", GetRecipe);
router.get("/list", ListRecipe);
router.post("/create", CreateRecipe);
router.put("/update", UpdateRecipe);
router.delete("/delete", DeleteRecipe);

// Export the router to use it in the main app file
module.exports = router;