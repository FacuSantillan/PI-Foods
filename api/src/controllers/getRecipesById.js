const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Recipe, Diets } = require('../db')

const getRecipesById = async (req, res) => {
   //primero busca el id en la DB
   const { id } = req.params;
   if (id.includes('-')) {
    try {
        const recipeDB = await Recipe.findOne({
            where: {id: id},
            include: { model: Diets},  
        });
    //en caso que el id se encuentre en la base de datos retorna la info
        return recipeDB;
    } catch (error) {
        return { error: error.message };
    };
    //en caso que no se haya encontrado la id en la base de datos, se la busca en la API
} else {

    try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`);
    
    //mapeamos la data de la API para traernos solo la info que necesitamos
    const recipe = response.data.results.map((data) => {
        const {title, image, summary, healthScore, diets, id} = data;
        return {
            id,
            title,
            image,
            summary,
            healthScore,
            //los paso a paso estan dentro de analyzedInstructions, este es el arreglo de objetos
            steps: data.analyzedInstructions?.map((step) => 
                step.steps.map((step) => {
                    return {
                        number: step.number,
                        step: step.step,
                    };
                })
            ),
            diets: diets.map((diet) => {
                return {
                    name: diet
                };
            }),
        };
    });
    return res.status(200).json(recipe)

} catch (error) {
    res.status(500).json({ error: error.message });
}}
};

module.exports = {
    getRecipesById
};