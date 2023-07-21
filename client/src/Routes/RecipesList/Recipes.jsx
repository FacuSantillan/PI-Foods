import { useSelector } from 'react-redux'

import Filters from '../../components/Filters/filters'

import Cards from '../../components/Cards/cards'
import './Recipes.css'

export default function Recipes() {

    const allRecipes = useSelector((state) => state.allRecipes);

    return(
        <div className='page'>
            <Filters/> 
            <Cards key={Cards} allRecipes= {allRecipes}/>
            
        </div>
    );
};
