//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeList from './listRecipe.jsx';
import CreateRecipe from './createRecipe.jsx';
import ShowRecipe from './showRecipe.jsx';
//import RecipeRating from './recipeRating.jsx';
import EditRecipe from './editRecipe.jsx';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';


function Home(){
  const navigate = useNavigate();

  return(
    <div className="header">
      <header>
        <h1> Welcome to Recipe Manager App</h1>
        <p>Create, manage, and rate your recipes. You forgot to add an ingredient? No problem! You can edit your recipes anytime, anywhere.</p>
      </header>
    
      <div className="button">
        <button id="createRecipe" onClick={() => navigate('/createRecipe')} ><strong>Create a new recipe</strong></button><br/><br/>
        <button id="recipeList" onClick={() => navigate('/recipeList')}><strong>List of recipes</strong></button>
      </div>
    </div>
  );
}

function App() {
  return (

   <div className='App'>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/recipeList" element={<RecipeList/>}/>
        <Route path='/createRecipe' element={<CreateRecipe/>}/>
        <Route path='/showRecipe' element={<ShowRecipe/>}/>
        <Route path='/editRecipe/:id' element={<EditRecipe/>}/>
        <Route path='/showRecipe/:id' element={<ShowRecipe/>}/>
        
      </Routes>
    </Router>
   </div>
  );
}

export default App;
