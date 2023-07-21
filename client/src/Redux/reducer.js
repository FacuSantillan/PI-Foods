//---------------------importacion de los types--------------------------------//
import {
    GET_RECIPES,
    GET_RECIPES_NAME,
    GET_RECIPES_ID,
    ADD_RECIPE,
    GET_DIETS,
    RESET_STATE,
    FILTER_BY_DIET,
    ORDER_BY_NAME,
    ORDER_BY_HEALTHSCORE,
    FILTER_BY_ORIGIN,
  } from "./action";
  
  const initialState = {
    allRecipes: [],
    recipesCopy: [],
    recipes: [],
    recipeid: [],
    allDiets: [],
    createRecipe: [],
    resetData: [],
    filteredRecipes: [],
    isLoading: false,
    error: null,
  };
  
  function reducer(state = initialState, action) {
    switch (action.type) {
      // Caso 1: GET_RECIPES
      case GET_RECIPES:
        // Actualiza el estado "allRecipes" y "recipesCopy" con las recetas obtenidas desde la acción.
        return {
          ...state,
          allRecipes: action.payload,
          recipesCopy: action.payload,
        };
    
      // Caso 2: GET_RECIPES_NAME
      case GET_RECIPES_NAME:
        // Actualiza el estado "allRecipes" con las recetas filtradas por el nombre proporcionado en la acción.
        return {
          ...state,
          allRecipes: action.payload,
        };
    
      // Caso 3: GET_RECIPES_ID
      case GET_RECIPES_ID:
        // Actualiza el estado "recipeid" con los detalles de una receta específica obtenida desde la acción.
        return {
          ...state,
          recipeid: action.payload,
        };
    
      // Caso 4: ADD_RECIPE
      case ADD_RECIPE:
        // Agrega una nueva receta al estado "allRecipes" y actualiza "createRecipe" con la nueva receta.
        return {
          ...state,
          allRecipes: [...state.allRecipes, action.payload],
          createRecipe: [...state.createRecipe, action.payload],
        };
    
      // Caso 5: GET_DIETS
      case GET_DIETS:
        // Actualiza el estado "allDiets" con las dietas obtenidas desde la acción.
        return {
          ...state,
          allDiets: action.payload,
        };
    
      // Caso 6: FILTER_BY_DIET
      case FILTER_BY_DIET:
        // Filtra las recetas por dieta según el valor proporcionado en la acción.
        const filtered = state.allRecipes.filter((recipe) => {
          return recipe.diets.some((diet) => diet.name === action.payload);
        });
        // Si el valor es "NF", restaura el estado a "filteredRecipes"; de lo contrario, filtra las recetas según la dieta.
        return {
          ...state,
          allRecipes: action.payload === "NF" ? [...state.filteredRecipes] : filtered,
        };
    
      // Caso 7: RESET_STATE
      case RESET_STATE:
        // Restaura el estado global de la aplicación a su estado inicial.
        return initialState;
    
      // Caso 8: ORDER_BY_NAME
      case ORDER_BY_NAME:
        // Crea una copia de las recetas para ordenarlas sin afectar la original.
        let recipesCopy = [...state.allRecipes];
        // Ordena las recetas por nombre de manera ascendente o descendente según el valor proporcionado en la acción.
        if (action.payload === "A") {
          recipesCopy.sort((a, b) => {
            const nameA = a.title.toUpperCase();
            const nameB = b.title.toUpperCase();
    
            if (nameA < nameB) {
              return -1;
            }
    
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
        } else if (action.payload === "D") {
          recipesCopy.sort((a, b) => {
            const titleA = a.title.toUpperCase();
            const titleB = b.title.toUpperCase();
    
            if (titleA > titleB) {
              return -1;
            }
            if (titleA < titleB) {
              return 1;
            }
    
            return 0;
          });
        } else {
          // Si el valor proporcionado no es válido, mantiene el estado sin cambios.
          recipesCopy = [...state.filteredRecipes];
        }
        // Devuelve el estado actualizado con las recetas ordenadas.
        return {
          ...state,
          allRecipes: recipesCopy,
        };
    
      // Caso 9: ORDER_BY_HEALTHSCORE
      case ORDER_BY_HEALTHSCORE:
        // Crea una copia de las recetas para ordenarlas sin afectar la original.
        let recipesOrdered = [...state.allRecipes];
    
        // Ordena las recetas por puntuación de salud (healthScore) de manera ascendente o descendente según el valor proporcionado en la acción.
        if (action.payload === "A") {
          recipesOrdered.sort((a, b) => a.healthScore - b.healthScore);
        } else if (action.payload === "D") {
          recipesOrdered.sort((a, b) => b.healthScore - a.healthScore);
        } else {
          // Si el valor proporcionado no es válido, mantiene el estado sin cambios.
          recipesOrdered = [...state.filteredRecipes];
        }
    
        // Devuelve el estado actualizado con las recetas ordenadas por puntuación de salud.
        return {
          ...state,
          allRecipes: recipesOrdered,
        };
    
      // Caso 10: FILTER_BY_ORIGIN
      case FILTER_BY_ORIGIN:
        // Crea copias de las recetas para filtrarlas sin afectar las originales.
        let origin = [...state.allRecipes];
        let originCopy = [...state.allRecipes];
    
        // Filtra las recetas según el origen proporcionado en la acción ("API" o "DB").
        if (action.payload === 'API') {
            origin = origin.filter((recipe) => !String(recipe.id).includes('-'));
        } else if (action.payload === 'DB') {
            originCopy = origin.filter((recipe) => String(recipe.id).includes('-'));
        }
    
        // Devuelve el estado actualizado con las recetas filtradas por origen.
        return {
          ...state,
          allRecipes: action.payload === "NF" ? originCopy : origin,
        };
    
      // Caso por defecto: si la acción no coincide con ningún caso, devuelve el estado sin cambios.
      default:
        return state;
    }
  };
  
  export default reducer;
