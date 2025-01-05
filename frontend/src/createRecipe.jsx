
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests
import Icon from '@mdi/react';
import { mdiTrashCanOutline } from '@mdi/js';
import { mdiPlus } from '@mdi/js';

function CreateRecipe() {
  const navigate = useNavigate();
  
  // Manage form data in state
  const [recipeData, setRecipeData] = useState({
    name: '',
    ingredients: [],
    instructions: '',
    rating: 1,
    foodCategory: 'Breakfast',
    favourite: false,
  });

  // Handle form data change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setRecipeData(prevState => ({
      ...prevState,
      [id]: id === 'rating' ? Number(value) : value,
    }));
  };

  // Handle adding new ingredients
  const handleAddIngredient = (e) => {
    e.preventDefault();
    const newIngredient = {
      ingredientName: '',
      value: 0,
      unit: 'g',
    };
    setRecipeData(prevState => ({
      ...prevState,
      ingredients: [...prevState.ingredients, newIngredient]
    }));
  };

  // Handle submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();
  
  console.log("Favourite before formatting:", recipeData.favourite);

  const formattedData = {
    ...recipeData,
    favourite: recipeData.favourite,
  };
  
  console.log("Favourite after formatting:", formattedData.favourite);

    try {
      console.log("Payload being sent:", recipeData);
      const response = await axios.post('http://localhost:8000/recipe/create', recipeData, {
        headers: {'Content-Type': 'application/json'},
      });
      console.log(response.data);
      navigate('/'); // Redirect to home page or recipe list after successful creation
    } catch (error) {
      console.error('Error creating recipe:', error);
      console.log("Ingredients being sent:", recipeData.ingredients);
    }
  };

  const handleDiscard = (e) => {
    e.preventDefault();
    navigate('/'); // Go back to the main page
  };

  return (
    <header id='header'>
      <h1>Creating a new recipe</h1>

      <form className='recipeForm' onSubmit={handleSubmit}>
        <label htmlFor="recipeName">Name of the recipe</label><br/>
        <input 
          type='text' 
          id='name' 
          value={recipeData.name} 
          onChange={handleChange}
        /><br/>

        <div className="ingredientsDiv">
          
          {recipeData.ingredients.map((ingredient, index) => (
            <div key={index}>
                <label htmlFor="ingredientName">Ingredient</label><br/>
              <input 
                type='text' 
                id='ingredientName' placeholder='Ingredient name'
                value={ingredient.ingredientName} 
                onChange={(e) => {
                  const updatedIngredients = [...recipeData.ingredients];
                  updatedIngredients[index].ingredientName = e.target.value;
                  setRecipeData(prevState => ({
                    ...prevState,
                    ingredients: updatedIngredients
                  }));
                }}
              /><br/>
                <label htmlFor="unit" >Unit</label><br/>
                <input type='number' value={ingredient.value} placeholder="Amount" onChange={(e) => {
                  const updatedIngredients = [...recipeData.ingredients];
                  updatedIngredients[index].value = e.target.value;
                  setRecipeData(prevState => ({
                    ...prevState,
                    ingredients: updatedIngredients
                  }));
                }}
                />

              <select 
                id='unit' 
                name='unit' 
                value={ingredient.unit}
                onChange={(e) => {
                  const updatedIngredients = [...recipeData.ingredients];
                  updatedIngredients[index].unit = e.target.value;
                  setRecipeData(prevState => ({
                    ...prevState,
                    ingredients: updatedIngredients
                  }));
                }}
              >
                <option value="g">g</option>
                <option value="ml">ml</option>
                <option value="amount">amount</option>
              </select>
              <button 
                id="deleteingredient" 
                onClick={(e) => {
                  e.preventDefault();
                  const updatedIngredients = recipeData.ingredients.filter((_, i) => i !== index);
                  setRecipeData(prevState => ({
                    ...prevState,
                    ingredients: updatedIngredients
                  }));
                }}
              >
                <Icon path={mdiTrashCanOutline} size={1} color="white"/>
              </button>
            </div>
          ))}

          <button 
            id="addIngredient" 
            onClick={handleAddIngredient}
          >
            <Icon path={mdiPlus} size={1} color="black"/>
          </button>
        </div>

        <label htmlFor="instructions">Instructions</label><br/>
        <textarea 
          rows="4" 
          cols="40" 
          id='instructions' 
          value={recipeData.instructions} 
          onChange={handleChange}
        /><br/>

        <label htmlFor="rating">Rating</label><br/>
        <select 
          id='rating' 
          name='rating' 
          value={recipeData.rating} 
          onChange={handleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select><br/>

        <label htmlFor="foodCategory">Food Category</label><br/>
        <select 
          id='foodCategory' 
          name='foodCategory' 
          value={recipeData.foodCategory} 
          onChange={handleChange}
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Desert">Desert</option>
          <option value="Vegan">Vegan</option>
        </select>

        <div className="createRecipeButtons">
          <button id='discard' onClick={handleDiscard}><strong>Discard</strong></button>
          <button id='create' type="submit"><strong>Create</strong></button>
        </div>
      </form>
    </header>
  );
}

export default CreateRecipe;
