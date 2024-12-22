// server/controller/recipe.js
const express = require("express");
const router = express.Router();

const GetRecipe = require("../abl/category/getRecipe");
const ListRecipe = require("../abl/category/listRecipe");
const CreateRecipe = require("../abl/category/createRecipe");
const UpdateRecipe = require("../abl/category/updateRecipe");
const DeleteRecipe = require("../abl/category/deleteRecipe");

router.get("/get", GetRecipe);
router.get("/list", ListRecipe);
router.post("/create", CreateRecipe);
router.post("/update", UpdateRecipe);
router.post("/delete", DeleteRecipe);

module.exports = router;