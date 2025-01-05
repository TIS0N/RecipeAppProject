// Import AJV for schema validation
const Ajv = require("ajv");
const ajv = new Ajv();

// Imponrt category DAO for data storage
const categoryDao = require("../../dao/category-dao.js");

// Defined schema for recipe validation
const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    ingredients: {
      type: "array",
      items: {
        type: "object",
        properties: {
          ingredientName: { type: "string" },
          value: { type: "number" },
          unit: { type: "string", enum: ["g", "ml", "amount"] },
        },
        required: ["ingredientName", "value", "unit"],
        additionalProperties: false,
      },
    },
    instructions: { type: "string" },
    rating: { type: "number" },
    foodCategory: { type: "string" },
    favourite: { type: "boolean", default: false},
  },
  required: ["name", "ingredients"],
  additionalProperties: false,
};


// Function to handle recipe creation 
async function CreateRecipe(req, res) {
  try {
    console.log("Incoming request body:", req.body);
    let category = req.body;

    // Setting favourite to false by default if not provided
    if(category.favourite === undefined){
        category.favourite = false;
    }

    // Validate the input data against the schema
    const valid = ajv.validate(schema, category);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        category: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // SAvong the category to a persistent storage
    try {
      category = categoryDao.create(category);
    } catch (e) {
      res.status(400).json({
        ...e,
      });
      return;
    }

    // return properly filled dtoOut and a successful response
    res.status(201).json({ message: "Recipe created successfully.", category});
  } catch (e) {
    // Server Error
    res.status(500).json({ category: e.category });
  }
}

// Exporting function for use in routes
module.exports = CreateRecipe;