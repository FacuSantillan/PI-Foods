const getAllRecipesApi = require('./helpers/getAllFromApi');
const getAllRecipesDB = require('./helpers/getAllFromDB');

const getAllrecipes = async() => {
   //se trae todas las recetas de la API
   const apiRecipe = await getAllRecipesApi();
   //se trae todas las recetaas de la base de datos
   const dbRecipe = await getAllRecipesDB();

   //se almacenan los datos de la api y de la DB en una sola variable 
   const allRecipes = [...apiRecipe,...dbRecipe];
   //se retorna esa variable
   return allRecipes;
}

module.exports= { 
    getAllrecipes
};