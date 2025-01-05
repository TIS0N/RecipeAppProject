/*
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiTrashCanOutline } from '@mdi/js';
import { mdiPlus } from '@mdi/js';
import axios from 'axios';

function EditRecipe() {
    const { id } = useParams(); // Get the recipe ID from the URL
    const navigate = useNavigate();

    // State to store recipe data
    const [recipeData, setRecipeData] = useState({
        name: '',
        ingredients: [],
        instructions: '',
        rating: 1,
        foodCategory: 'Breakfast',
        favourite: false,
    });

    // Fetch recipe data on component mount
    useEffect(() => {
        const fetchRecipeData = async () => {
            try {
                // Correct the URL here: we want to fetch the recipe, not update it
                const response = await axios.get(`http://localhost:8000/recipe/get?id=${id}`);
                setRecipeData(response.data); // Populate form with fetched recipe data
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };
        fetchRecipeData();
    }, [id]);  // Effect runs when the recipe ID changes

    // Handle input changes for form fields
    const handleChange = (e) => {
        const { id, value } = e.target;
        setRecipeData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    // Handle adding new ingredients
    const handleAddIngredient = (e) => {
        e.preventDefault();
        setRecipeData((prevState) => ({
            ...prevState,
            ingredients: [...prevState.ingredients, { ingredientName: '', value: 0, unit: 'g' }],
        }));
    };

    // Handle submitting the updated recipe
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Sending PUT request to update the recipe data
            await axios.put(`http://localhost:8000/recipe/update/${id}`, recipeData);
            navigate('/recipeList'); // Redirect to the recipe list after updating
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };

    return (
        <header id="header">
            <h1>Editing Recipe</h1>

            <form className="recipeForm" onSubmit={handleSubmit}>
                <label htmlFor="name">Name of the recipe</label><br />
                <input
                    type="text"
                    id="name"
                    value={recipeData.name}
                    onChange={handleChange}
                    placeholder={recipeData.name}
                /><br />

                <div className="ingredientsDiv">
                    {recipeData.ingredients.map((ingredient, index) => (
                        <div key={index}>
                            <label htmlFor={`ingredientName-${index}`}>Ingredient</label><br />
                            <input
                                type="text"
                                id={`ingredientName-${index}`}  // Make id dynamic per ingredient
                                value={ingredient.ingredientName}
                                onChange={(e) => {
                                    const updatedIngredients = [...recipeData.ingredients];
                                    updatedIngredients[index].ingredientName = e.target.value;
                                    setRecipeData((prevState) => ({
                                        ...prevState,
                                        ingredients: updatedIngredients,
                                    }));
                                }}
                                placeholder="Enter ingredient name"
                            /><br />
                            <label htmlFor={`value-${index}`}>Amount</label><br />
                            <input
                                type="number"
                                id={`value-${index}`}  // Make id dynamic per ingredient
                                value={ingredient.value}
                                onChange={(e) => {
                                    const updatedIngredients = [...recipeData.ingredients];
                                    updatedIngredients[index].value = e.target.value;
                                    setRecipeData((prevState) => ({
                                        ...prevState,
                                        ingredients: updatedIngredients,
                                    }));
                                }}
                                placeholder="Enter ingredient amount"
                            />

                            <select
                                id={`unit-${index}`}  // Make id dynamic per ingredient
                                value={ingredient.unit}
                                onChange={(e) => {
                                    const updatedIngredients = [...recipeData.ingredients];
                                    updatedIngredients[index].unit = e.target.value;
                                    setRecipeData((prevState) => ({
                                        ...prevState,
                                        ingredients: updatedIngredients,
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
                                    setRecipeData((prevState) => ({
                                        ...prevState,
                                        ingredients: updatedIngredients,
                                    }));
                                }}
                            >
                                <Icon path={mdiTrashCanOutline} size={1} color="white" />
                            </button>
                        </div>
                    ))}

                    <button id="addIngredient" onClick={handleAddIngredient}>
                        <Icon path={mdiPlus} size={1} color="black" />
                    </button>
                </div>

                <label htmlFor="instructions">Instructions</label><br />
                <textarea
                    rows="4"
                    cols="40"
                    id="instructions"
                    value={recipeData.instructions}
                    onChange={handleChange}
                    placeholder="Enter the instructions"
                /><br />

                <label htmlFor="rating">Rating</label><br />
                <select
                    id="rating"
                    value={recipeData.rating}
                    onChange={handleChange}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select><br />

                <label htmlFor="foodCategory">Food Category</label><br />
                <select
                    id="foodCategory"
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
                    <button type="button" id="discard" onClick={() => navigate('/recipeList')}>
                        <strong>Back</strong>
                    </button>
                    <button type="submit" id="save">
                        <strong>Save</strong>
                    </button>
                </div>
            </form>
        </header>
    );
}

export default EditRecipe;
*/

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiTrashCanOutline } from '@mdi/js';
import { mdiPlus } from '@mdi/js';
import axios from 'axios';

function EditRecipe() {
    const { id } = useParams(); // Get the recipe ID from the URL
    const navigate = useNavigate();

    // State to store recipe data
    const [recipeData, setRecipeData] = useState({
        name: '',
        ingredients: [],
        instructions: '',
        rating: 1,
        foodCategory: 'Breakfast',
        favourite: false,
    });

    // Fetch recipe data on component mount
    useEffect(() => {
        const fetchRecipeData = async () => {
            try {
                // Correct the URL here: we want to fetch the recipe, not update it
                const response = await axios.get(`http://localhost:8000/recipe/get?id=${id}`);
                setRecipeData(response.data); // Populate form with fetched recipe data
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };
        fetchRecipeData();
    }, [id]);  // Effect runs when the recipe ID changes

    // Handle input changes for form fields
    const handleChange = (e) => {
        const { id, value } = e.target;
        setRecipeData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    // Handle adding new ingredients
    const handleAddIngredient = (e) => {
        e.preventDefault();
        setRecipeData((prevState) => ({
            ...prevState,
            ingredients: [...prevState.ingredients, { ingredientName: '', value: 0, unit: 'g' }],
        }));
    };

    // Handle submitting the updated recipe
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!recipeData.name || !recipeData.ingredients.length) {
            alert('Please fill in all required fields!');
            return;
        }

        try {
            // Sending PUT request to update the recipe data
            const response = await axios.put(`http://localhost:8000/recipe/update/${id}`, recipeData);

            if (response.status === 200) {
                navigate('/recipeList'); // Redirect to the recipe list after updating
            }
        } catch (error) {
            console.error('Error updating recipe:', error);
            alert('An error occurred while saving the recipe.');
        }
    };

    return (
        <header id="header">
            <h1>Editing Recipe</h1>

            <form className="recipeForm" onSubmit={handleSubmit}>
                <label htmlFor="name">Name of the recipe</label><br />
                <input
                    type="text"
                    id="name"
                    value={recipeData.name}
                    onChange={handleChange}
                    placeholder="Recipe Name"
                /><br />

                <div className="ingredientsDiv">
                    {recipeData.ingredients.map((ingredient, index) => (
                        <div key={index}>
                            <label htmlFor={`ingredientName-${index}`}>Ingredient</label><br />
                            <input
                                type="text"
                                id={`ingredientName-${index}`}  // Dynamically create unique IDs
                                value={ingredient.ingredientName}
                                onChange={(e) => {
                                    const updatedIngredients = [...recipeData.ingredients];
                                    updatedIngredients[index].ingredientName = e.target.value;
                                    setRecipeData((prevState) => ({
                                        ...prevState,
                                        ingredients: updatedIngredients,
                                    }));
                                }}
                                placeholder="Enter ingredient name"
                            /><br />
                            <label htmlFor={`value-${index}`}>Amount</label><br />
                            <input
                                type="number"
                                id={`value-${index}`}
                                value={ingredient.value}
                                onChange={(e) => {
                                    const updatedIngredients = [...recipeData.ingredients];
                                    updatedIngredients[index].value = e.target.value;
                                    setRecipeData((prevState) => ({
                                        ...prevState,
                                        ingredients: updatedIngredients,
                                    }));
                                }}
                                placeholder="Enter ingredient amount"
                            />

                            <select
                                id={`unit-${index}`}
                                value={ingredient.unit}
                                onChange={(e) => {
                                    const updatedIngredients = [...recipeData.ingredients];
                                    updatedIngredients[index].unit = e.target.value;
                                    setRecipeData((prevState) => ({
                                        ...prevState,
                                        ingredients: updatedIngredients,
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
                                    setRecipeData((prevState) => ({
                                        ...prevState,
                                        ingredients: updatedIngredients,
                                    }));
                                }}
                            >
                                <Icon path={mdiTrashCanOutline} size={1} color="white" />
                            </button>
                        </div>
                    ))}

                    <button id="addIngredient" onClick={handleAddIngredient}>
                        <Icon path={mdiPlus} size={1} color="black" />
                    </button>
                </div>

                <label htmlFor="instructions">Instructions</label><br />
                <textarea
                    rows="4"
                    cols="40"
                    id="instructions"
                    value={recipeData.instructions}
                    onChange={handleChange}
                    placeholder="Enter the instructions"
                /><br />

                <label htmlFor="rating">Rating</label><br />
                <select
                    id="rating"
                    value={recipeData.rating}
                    onChange={handleChange}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select><br />

                <label htmlFor="foodCategory">Food Category</label><br />
                <select
                    id="foodCategory"
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
                    <button type="button" id="discard" onClick={() => navigate('/recipeList')}>
                        <strong>Back</strong>
                    </button>
                    <button type="submit" id="save">
                        <strong>Save</strong>
                    </button>
                </div>
            </form>
        </header>
    );
}

export default EditRecipe;
