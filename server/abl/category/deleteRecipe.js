// Importing AJV for schema validation
const Ajv = require("ajv");
const ajv = new Ajv();

//Import category DAO for data storage
const categoryDao = require("../../dao/category-dao.js");

// Define the schema for input validation where ID is required
const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

// Function to handle recipe deletion
async function DeleteRecipe(req, res) {
  try {
    const reqParams = req.body;

    // Validate input against schema
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        category: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // Check if the recipe exists by its ID
    const recipe = await categoryDao.get(reqParams.id);

    if (!recipe) {
      res.status(404).json({
        code: "recipeNotFound",
        message: `Recipe with id '${reqParams.id}' does not exist.`,
      });
      return;
    }
    
    // Remove the recipe from persistant storage
    categoryDao.remove(reqParams.id);

    // Return properly filled dtoOut and a successful response
    res.status(200).json({ message: "Recipe deleted successfully." });
  } catch (e) {
    // 500 Server Error
    res.status(500).json({ category: e.category });
  }
}
// Export the function for use in routes
module.exports = DeleteRecipe;