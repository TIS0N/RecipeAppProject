const Ajv = require("ajv");
const ajv = new Ajv();

const categoryDao = require("../../dao/category-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    ingredients: {type: "string"},
    instructions: {type: "string"},
    rating: {type: "number"},
    foodCategory: {type: "string"},
    favourite: {type: "boolean"},
  },
  required: ["name"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let category = req.body;

    if(category.favourite === undefined){
        category.favourite = false;
    }

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

    // store category to a persistant storage
    try {
      category = categoryDao.create(category);
    } catch (e) {
      res.status(400).json({
        ...e,
      });
      return;
    }

    // return properly filled dtoOut
    // Return a successful response
    res.status(201).json({ message: "Recipe created successfully.", category});
    //res.json(category);
  } catch (e) {
    res.status(500).json({ category: e.category });
  }
}

module.exports = CreateAbl;