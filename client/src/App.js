import './App.css';
import { Route, Routes, useLocation} from 'react-router-dom';

import Landing from './Routes/LandingPage/Landing';
import Home from './Routes/Home/Home';
import NavBar from './components/NavBar/NavBar';
import About from './Routes/About/about';
import Detail from './Routes/Detail/detail';
import Create from './Routes/CreateRecipe/create';
import Recipes from './Routes/RecipesList/Recipes';

axios.defaults.baseURL = 'https://proyecto-individual-foods-production.up.railway.app/'

function App() {
  const allDiets = [...new Set()]

  const {pathname} = useLocation();

  return (
    <div>
      {pathname !== '/' && <NavBar/>}
      
      <Routes>
        <Route path='/' element={<Landing/>}/>;
        <Route path='/home' element={<Home/>}/>;
        <Route path='/about' element={<About/>}/>;
        <Route path='/detail/:id' element={<Detail/>}/>;
        <Route path='/recipes' element={<Recipes/>}/>;
        <Route path='/create' element={<Create/>}/>;
      </Routes>

    </div>
  );
}

export default App;
