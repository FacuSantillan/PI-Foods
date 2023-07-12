const axios = require('axios');
require('dotenv').config()
const {API_KEY}=process.env

const getAllRecipesApi = async() => {
    try {
        //traemos toda la info de la api y la guardamos en una constante
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)

        //mapeamos la informacion que nos trae la peticion de la api

        const recipeData = response.data.results.map((item) => {
            const {title, image, summary, healthScore, diets, id} = item;
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
                diets: diets.map((diet)=>{
                    return {
                        name: diet
                    };
                }),
            };
        });
        
        //retornamos solo la informacion necesaria de la api
        return recipeData;
    } catch (error) {
        return { error: error.message }
    }
};

module.exports = getAllRecipesApi