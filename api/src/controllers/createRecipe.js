const { Recipe, Diets } = require('../db')
const { Op } = require("sequelize");

const createRecipe = async (recipeObj) => {

// Extraemos los datos de la receta del objeto recipeObj
const { title, summary, healthScore, steps, image, diets } = recipeObj;

// Creamos una nueva receta en la base de datos usando el modelo Recipe
const newRecipe = await Recipe.create({
    title,
    summary,
    healthScore,
    steps,
    image, 
    diets,
});

// Obtenemos los tipos de dietas asociados a la receta
let findDiets = await Diets.findAll({
    where: {
        name: { [Op.iLike]: `%${diets}` }, // Utilizamos el operador de Sequelize 'Op.iLike' para realizar una búsqueda sin distinguir mayúsculas y minúsculas por el nombre de la dieta
    },
});

// Asociamos los tipos de dieta a la receta recién creada
await newRecipe.addDiet(findDiets);

// Buscamos nuevamente la receta en la base de datos, incluyendo los tipos de dieta asociados, y seleccionamos solo ciertos atributos
const result = await Recipe.findOne({
    where: {
        id: newRecipe.id, // Buscamos la receta por su ID recién creada
    },
    attributes: ['id', 'title', 'summary', 'healthScore', 'steps', 'image'],
    include: { model: Diets }, // Incluimos el modelo Diets para obtener la información de los tipos de dieta asociados
});

// Devolvemos el resultado de la búsqueda de la receta recién creada
return result;
}

// Exportamos la función createRecipe para que pueda ser utilizada en otros módulos
module.exports = {
createRecipe
} 