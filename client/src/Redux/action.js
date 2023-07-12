import axios from 'axios'
import { GET_ALL_POKEMONS, GET_DETAIL_POKEMONS } from './actionType'

export const getPokemons = () => {
    return async function(dispatch) {

        try {
            let response = await axios.get('/pokemon');
            return dispatch({ type:GET_ALL_POKEMONS, payload:response.data.results })

        } catch (error) {
            
        }

      
    }
};