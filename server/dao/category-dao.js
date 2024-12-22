// Importing required modules for file system operations and cryptography
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// Defining the path to the recipe storage folder
const recipeFolderPath = path.join(__dirname, "storage", "recipeList");

// Method to read a recipe from a file by its ID
function get(recipeId) {
  try {
    // Construct the file path for the given recipe ID
    const filePath = path.join(recipeFolderPath, `${recipeId}.json`);
    // Read the file content and parse it as JSON
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    // If the file doesn't exist (ENOENT), return null
    if (error.code === "ENOENT") return null;
    // If other errors occur, throw a custom error
    throw { code: "failedToReadRecipe", recipe: error.recipe };
  }
}

// Method to create and save a new recipe
function create(recipe) {
  try {
    // Retrieve the current list of recipes
    const recipeList = list();
    
    // Check if a recipe with the same name already exists
    if (recipeList.some((item) => item.name === recipe.name)) {
      throw {
        code: "uniqueNameAlreadyExists",
        message: "exists recipe with given name",
      };
    }
    
    // Generate a new unique ID for the recipe using crypto module
    recipe.id = crypto.randomBytes(16).toString("hex");
    
    // Define the file path for the new recipe
    const filePath = path.join(recipeFolderPath, `${recipe.id}.json`);
    
    // Convert the recipe object to a JSON string and write it to the file
    const fileData = JSON.stringify(recipe);
    fs.writeFileSync(filePath, fileData, "utf8");
    
    // Return the created recipe
    return recipe;
  } catch (error) {
    // If any error occurs, throw a custom error
    throw { code: "failedToCreateRecipe", recipe: error.recipe };
  }
}

// Method to update an existing recipe
function update(recipe) {
  try {
    // Retrieve the current recipe from the storage by its ID
    const currentRecipe = get(recipe.id);
    
    // If no recipe is found, return null
    if (!currentRecipe) return null;

    // Check if the recipe's name is changing and if the new name already exists
    if (recipe.name && recipe.name !== currentRecipe.name) {
      const recipeList = list();
      if (recipeList.some((item) => item.name === recipe.name)) {
        throw {
          code: "uniqueNameAlreadyExists",
          message: "exists recipe with given name",
        };
      }
    }

    // Merge the new recipe data with the existing recipe
    const newRecipe = { ...currentRecipe, ...recipe };

    // Define the file path for the updated recipe
    const filePath = path.join(recipeFolderPath, `${recipe.id}.json`);
    
    // Convert the updated recipe object to a JSON string and write it to the file
    const fileData = JSON.stringify(newRecipe);
    fs.writeFileSync(filePath, fileData, "utf8");
    
    // Return the updated recipe
    return newRecipe;
  } catch (error) {
    // If any error occurs, throw a custom error
    throw { code: "failedToUpdateRecipe", recipe: error.recipe };
  }
}

// Method to remove a recipe by its ID
function remove(recipeId) {
  try {
    // Construct the file path for the recipe to be deleted
    const filePath = path.join(recipeFolderPath, `${recipeId}.json`);
    
    // Delete the file from the storage
    fs.unlinkSync(filePath);
    
    // Return an empty object as confirmation of successful deletion
    return {};
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Error in recipeDao.remove:", error);
    
    // If the file doesn't exist (ENOENT), return an empty object
    if (error.code === "ENOENT") {
      return {};
    }
    
    // If other errors occur, throw a custom error
    throw { code: "failedToRemoveRecipe", recipe: error.recipe };
  }
}

// Method to list all recipes stored in the folder
function list() {
  try {
    // Read all files from the recipe folder
    const files = fs.readdirSync(recipeFolderPath);
    
    // Map each file to its parsed JSON data (representing a recipe)
    const recipeList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(recipeFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    
    // Return the list of recipes
    return recipeList;
  } catch (error) {
    // If any error occurs, throw a custom error
    throw { code: "failedToListRecipies", recipe: error.recipe };
  }
}

// Method to get a map of recipes where the key is the recipe ID
function getRecipeMap() {
  // Initialize an empty object for the recipe map
  const recipeMap = {};
  
  // Get the list of recipes
  const recipeList = list();
  
  // Populate the recipe map with ID as the key and recipe as the value
  recipeList.forEach((recipe) => {
    recipeMap[recipe.id] = recipe;
  });
  
  // Return the recipe map
  return recipeMap;
}

// Export all the methods for external use
module.exports = {
  get,
  create,
  update,
  remove,
  list,
  getRecipeMap,
};
