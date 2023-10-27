import axios from 'axios';

//---------------------exportaciones de los types--------------------------------//

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPES_NAME = "GET_RECIPES_NAME";
export const GET_RECIPES_ID = "GET_RECIPES_ID";
export const ADD_RECIPE = "ADD_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const RESET_STATE = "RESET_STATE"
export const FILTER_BY_DIET = "FILTER_BY_DIET"
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN"
export const ORDER_BY_HEALTHSCORE = "ORDER_BY_HEALTHSCORE"


//---------------------------obtener recetas------------------------------------//

export function getRecipes() {
    return async function (dispatch){
        const response = await axios(`/recipes`);
        
     return dispatch({
            type:'GET_RECIPES',
            payload: response.data,
        });
    };
};

//---------------------------buscar por nombre------------------------------------//

export function getRecipeName (name) {
    return async function (dispatch) {
      try {
        const response = await axios.get(`/recipes?name=${name}`);
       
        return dispatch({
          type: 'GET_RECIPES_NAME',
          payload: response.data,
        });
      } catch (error) {
        window.alert('Recipe not found.');
    }};
  }

//---------------------------buscar por id------------------------------------//

export function getRecipeId (id) {
    return async function (dispatch) {
        const response = await axios(`/recipes/${id}`);

        return dispatch({
            type: 'GET_RECIPES_ID',
            payload: response.data,
        });
    };
};

//---------------------------crear receta------------------------------------//
export const addRecipe = (form) => {
    return async (dispatch) => {
        const response = await axios.post(`/recipes`, form);
        return dispatch({
            type: 'ADD_RECIPE',
            payload: response.data,
        });
    };
};

//---------------------------obtener dietas------------------------------------//

export const getDiets = () => {
	return async (dispatch) => {
		const response = await axios.get(`/diets`);
		return dispatch({
			type: 'GET_DIETS',
			payload: response.data,
		});
	};
};

//---------------------------limpiar estados------------------------------------//

export const resetState = () => {
    return {
      type: 'RESET_STATE',
    };
  };

//---------------------------filtrar por dietas------------------------------------//

export const filterByDiet = (diet) =>{
  return async (dispatch) => {
      return dispatch({
          type: 'FILTER_BY_DIET',
          payload: diet,
      });
  };
};

//---------------------------filtrar por nombre------------------------------------//

export const orderByName = (order) => {
	return {
		type: 'ORDER_BY_NAME',
		payload: order,
	};
};

//---------------------------filtrar por HealthScore------------------------------------//

export const orderByHealthScore = (order) => {
    return {
        type: 'ORDER_BY_HEALTHSCORE',
        payload: order,
    };
  };

//---------------------------filtrar por origen------------------------------------//

  export const filterByOrigin = (origin) => {
    return async (dispatch) => {
        return dispatch({
            type: FILTER_BY_ORIGIN,
            payload: origin,
        });
    };
};
