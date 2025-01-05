import React, { useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ShowRecipe() {
    const navigate = useNavigate();
    const { id } = useParams();
    const[recipe,setRecipe] = useState(null);

    useEffect(() => {
        async function fetchRecipeDetails(id){
            try{
                const response = await fetch(`http://localhost:8000/recipe/get?id=${id}`);
                const data = await response.json();
                //console.log('Fetched recipe data:', data);
                setRecipe(data);
            }catch(error){
                console.error('Error fetching recipe details:', error);
            }
        }
        if(id){
            fetchRecipeDetails(id);
        }
        
    }, [id]);

    const Back = () => {
        navigate('/recipeList'); // Route for recipe details
    };

    if(!recipe){
        return <div>Loading...</div>;
    }else{

    }

    return (
      <header id='header'>
        <h1>{recipe.name}</h1>
        <div className='recipeDetails'>
            <label htmlFor="ingredientsDiv">Ingredients</label><br/>
            <div className="ingredientsDiv">
                <ol>
                    {recipe?.ingredients?.map((ingredient, index) => (
                        <li key={index}>
                            {ingredient.ingredientName} {ingredient.value} {ingredient.unit}
                        </li>
                    ))}
                </ol>
            </div>
            <label htmlFor="instructions">Instructions</label><br/>
            <p id='instructions'>{recipe.instructions}</p>

            <label htmlFor="rating">Rating</label><br/>
            <p id='rating'>{recipe.rating}</p>

            <label htmlFor="foodCategory">Food Category</label><br/>
            <p id='foodCategory'>{recipe.foodCategory}</p>
            
            <div className='createRecipeButtons'>
                <button id='back' onClick={Back}><strong>Back</strong></button>
            </div>
        </div>
     </header>
    );
  }
  
  export default ShowRecipe;