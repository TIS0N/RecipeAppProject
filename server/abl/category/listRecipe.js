// Import the category DAO for data access
const categoryDao = require("../../dao/category-dao.js");

// Function to handle listing of all recipes
async function ListRecipe(req, res) {
  try {
    const categoryList = categoryDao.list();

    // Checks if the category list is empty
    if(categoryList.length === 0){
        res.status(404).json({message: "No recipes found."});
    }else{
        res.json({ itemList: categoryList });
    }
  } catch (e) {
    // 500 Server Error
    res.status(500).json({ category: e.category });
  }
}

// Export the function for use in routes
module.exports = ListRecipe;