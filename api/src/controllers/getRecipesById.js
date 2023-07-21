const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Recipe, Diets } = require('../db')

const getRecipesById = async (id) => {
   // Primero busca el ID en la base de datos
   if (id.includes('-')) {
    try {
        // Busca la receta en la base de datos, incluyendo la asociación con los tipos de dietas
        const recipeDB = await Recipe.findOne({
            where: { id: id },
            include: { model: Diets },
        });
        // Retorna la información de la receta encontrada en la base de datos
        return recipeDB;
    } catch (error) {
        // En caso de error al buscar en la base de datos, retorna un objeto con el mensaje de error
        return { error: error.message };
    }
} else {
    try {
        // Si el ID no es de la base de datos, lo busca en la API externa usando Axios
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`);

        // Extrae la información relevante de la respuesta de la API
        const { title, summary, healthScore, image, analyzedInstructions, diets } = response.data;

        // Crea un objeto con la información de la receta obtenida desde la API
        const apiRecipe = {
            id: response.data.id,
            title,
            summary,
            healthScore,
            image,
            steps: analyzedInstructions[0]?.steps.map((step) => {
                return {
                    number: step.number,
                    step: step.step,
                };
            }),
            diets: diets.map((diet) => {
                return {
                    name: diet,
                };
            }),
        };

        // Retorna la información de la receta obtenida desde la API
        return apiRecipe;
    } catch (error) {
        // En caso de error al consultar la API, retorna un objeto con el mensaje de error
        return { error: error.message };
    }
}
};

module.exports = {
getRecipesById,
};