const Ajv = require("ajv");
const ajv = new Ajv();

const categoryDao = require("../../dao/category-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    ingredients: {type: "string"},
    instructions: {type: "string"},
    rating: {type: "number"},
    foodCategory: {type: "string"},
    favourite: {type: "boolean"},
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let category = req.body;

    // validate input
    const valid = ajv.validate(schema, category);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        category: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // update category in persistent storage
    let updatedCategory;
    try {
      updatedCategory = categoryDao.update(category);
    } catch (e) {
      res.status(400).json({
        ...e,
      });
      return;
    }
    if (!updatedCategory) {
      res.status(404).json({
        code: "categoryNotFound",
        category: `Category with id ${category.id} not found`,
      });
      return;
    }

    // return properly filled dtoOut
    // Return properly filled dtoOut and a successful response
    res.status(200).json({ message: "Recipe created successfully.", updatedCategory});
    //res.json(updatedCategory);
  } catch (e) {
    res.status(500).json({ category: e.category });
  }
}

module.exports = UpdateAbl;