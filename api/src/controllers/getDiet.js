require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Diets } = require('../db');

const getDiets = async() => {
    // Requerimos los datos de la DB en caso de que haya tipos de dietas existentes
    const existingDiets = await Diets.findAll();

    if (existingDiets.length > 0) {
        // Si existen tipos de dietas en la DB, los mapeamos para obtener solo los atributos necesarios (name e id)
        const diets = existingDiets.map((diet) => ({
            name: diet.name,
            id: diet.id
        }));
        // Retornamos los tipos de dietas obtenidos de la DB
        return diets;
    } else {
        // En caso de no haber tipos de dietas en la DB, los obtenemos desde una API externa usando Axios
        const apiDiets = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
        // Mapeamos los resultados de la API para obtener solo el atributo "diets" de cada receta y luego aplanamos la lista
        const diets = apiDiets.data.results.map((recipe) => recipe.diets).flat();

        // Quitamos los datos duplicados de la lista
        const deleteDuplicated = [...new Set(diets)];

        // Para cada dieta en la lista de datos no duplicados, buscamos o creamos un registro en la DB con el nombre de la dieta
        deleteDuplicated.forEach((elem) => {
            Diets.findOrCreate({
                where: {
                    name: elem,
                }
            })
        });
        // Retornamos la lista de tipos de dietas obtenida desde la API
        return deleteDuplicated;
    }
};

// Exportamos la función getDiets para que pueda ser utilizada en otros módulos
module.exports = {
    getDiets,
}