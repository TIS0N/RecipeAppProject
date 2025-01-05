// Import AJV for input validation
const Ajv = require("ajv");
const ajv = new Ajv();

// Imponrt category DAO to interact with data storage
const categoryDao = require("../../dao/category-dao.js");

// Define the schema for validating incoming data when updating a recipe
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
    favourite: { type: "boolean" },
  },
  required: ["name", "ingredients"],
  additionalProperties: false,
};


// Function to handle updating a recipe
async function UpdateRecipe(req, res) {
  try {
    let category = req.body;

    // Set to false by default if not changed
    if(category.favourite === undefined){
        category.favourite = false;
    }

    // Validate the input data againts the schema
    const valid = ajv.validate(schema, category);
    if (!valid) {
        res.status(400).json({
        code: "dtoInIsNotValid",
        category: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // Update the recipe in the storage
    let updatedCategory;
    try {
        // Calling the update method from DAO
        updatedCategory = categoryDao.update(category);
    } catch (e) {
        res.status(400).json({
        ...e,// Return any errors that occur during the update process
      });
        return;
    }

    // If no category was updated (example: the recipe doesn't exist), return 404 Error message
    if (!updatedCategory) {
        res.status(404).json({
        code: "categoryNotFound",
        category: `Category with id ${category.id} not found`,
      });
        return;
    }

    // Return properly filled dtoOut and a successful response
    res.status(200).json({ message: "Recipe updated successfully.", updatedCategory});
  } catch (e) {
    // 500 Server Error
    res.status(500).json({ category: e.category });
  }
}

// Export the function for use in routes
module.exports = UpdateRecipe;