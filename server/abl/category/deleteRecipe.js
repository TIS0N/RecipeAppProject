const Ajv = require("ajv");
const ajv = new Ajv();
const categoryDao = require("../../dao/category-dao.js");
//const transactionDao = require("../../dao/transaction-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function DeleteAbl(req, res) {
  try {
    const reqParams = req.body;

    // validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        category: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // Check if the recipe exists
    const recipe = await categoryDao.get(reqParams.id); // Assuming categoryDao.get retrieves a recipe by id
    if (!recipe) {
      res.status(404).json({
        code: "recipeNotFound",
        message: `Recipe with id '${reqParams.id}' does not exist.`,
      });
      return;
    }
    
    // remove transaction from persistant storage
    categoryDao.remove(reqParams.id);

    // return properly filled dtoOut
    //res.json({});
    // Return a successful response
    res.status(200).json({ message: "Recipe deleted successfully." });
  } catch (e) {
    res.status(500).json({ category: e.category });
  }
}

module.exports = DeleteAbl;