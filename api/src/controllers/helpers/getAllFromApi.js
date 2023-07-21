const axios = require('axios');
require('dotenv').config()
const {API_KEY}=process.env

const getAllRecipesApi = async() => {
    try {
        // Realizamos una petición a la API utilizando axios y pasando el API_KEY como parámetro
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);

        // Mapeamos la información recibida en la respuesta para extraer los datos necesarios de cada receta
        const recipeData = response.data.results.map((item) => {
            const { title, image, summary, healthScore, diets, id } = item;
            return {
                id,
                title,
                image,
                summary,
                healthScore,
                steps: item.analyzedInstructions?.map((step) =>
                    step.steps.map((step) => {
                        return {
                            number: step.number,
                            step: step.step,
                        };
                    })
                ),
                diets: diets.map((diet) => {
                    return {
                        name: diet,
                    };
                }),
            };
        });

        // Retornamos la información de las recetas mapeadas
        return recipeData;
    } catch (error) {
        // En caso de error, retornamos un objeto con el mensaje de error
        return { error: error.message };
    }
};

// Exportamos la función para poder utilizarla en otras partes de la aplicación
module.exports = getAllRecipesApi;