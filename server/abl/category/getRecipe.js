// Import AJV for input validation
const Ajv = require("ajv");
const ajv = new Ajv();

// Imponrt category DAO to interact with data storage
const categoryDao = require("../../dao/category-dao.js");

// Define schema to validate input (expects "id" as a string)
const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

// Function to handle retrieving a category by ID
async function GetRecipe(req, res) {
  try {
    // Get request parameters (either from query or body)
    const reqParams = req.query?.id ? req.query : req.body;

    // Validate the input against the schema
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
        // 400 respone with validation errors 
      res.status(400).json({
        code: "dtoInIsNotValid",
        category: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // Attempt to retrieve the category using the provided ID
    const category = categoryDao.get(reqParams.id);
    if (!category) {
        // 404 Error response if category does  not exists
        res.status(404).json({
        code: "categoryNotFound",
        category: `Category with id ${reqParams.id} not found`,
      });
      return;
    }

    // If category is found, return it in the response 
    res.json(category);
  } catch (e) {
    // Return 500 Server Error response
    res.status(500).json({ category: e.category });
  }
}

// Export the function for use in routes
module.exports = GetRecipe;