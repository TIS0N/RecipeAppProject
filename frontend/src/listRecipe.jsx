import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiStar, mdiPencil } from '@mdi/js';

function RecipeList(){
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        async function fetchRecipes(){
            try{
                const response = await fetch('http://localhost:8000/recipe/list');
                const data = await response.json();

                if(data.itemList){
                    setRecipes(data.itemList);
                }else{
                    console.error("No itemList found in response");
                }
            }catch(error){
                console.error('Error fetching recipes:', error);
            }
        }
        fetchRecipes();
    }, []);

    const handleDiscard = (e) => {
        e.preventDefault();
        navigate('/');
    };

    const ShowRecipe = (id) => {
        navigate(`/showRecipe/${id}`); 
    };
/*
    const ShowRating = () => {
        navigate('/recipeRating'); // Route for recipe rating page
    };
*/
    const EditRecipe = (id) => {
        navigate(`/editRecipe/${id}`); 
    };
    return (
        <header id='header'>
            <h1>Recipe List</h1>
            <div className='recipeList'>
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <div className='recipe' key={recipe.id}>
                            <button id='recipeNameOpenRecipe' onClick={() => ShowRecipe(recipe.id)}><strong>{recipe.name}</strong></button>
                            <button id='recipeRating' onClick={() => ShowRecipe(recipe.id)}><Icon path={mdiStar} size={2} color="gold"/></button>
                            <button id="recipeSettings" onClick={() => EditRecipe(recipe.id)}><Icon path={mdiPencil} size={1.5} color="white"/></button>
                        </div>
                    ))
                ) : (
                    <p>No recipes found.</p>
                )}
            </div>

            <button id='homeButton' onClick={handleDiscard}><strong>Home</strong></button>
        </header>
    );
  }
  
  export default RecipeList;