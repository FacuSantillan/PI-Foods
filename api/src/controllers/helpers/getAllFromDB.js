const { Recipe, Diets } = require('../../db')

const getAllRecipesDB = async(res) => {
    try {
        // Realizamos una consulta a la base de datos utilizando el modelo "Recipe"
        // y especificamos los atributos que queremos obtener
        const response = await Recipe.findAll({
            attributes: [
                'id',
                'title',
                'image',
                'summary',
                'healthScore',
                // También incluimos la tabla de "Diets" asociada a las recetas
            ],
            // Incluimos el modelo "Diets" para obtener los tipos de dieta asociados a cada receta
            include: { model: Diets },
        });

        // Mapeamos la información recibida en la respuesta para extraer los datos necesarios de cada receta
        // y devolvemos un nuevo objeto con la información requerida
        return response?.map((res) => {
            return {
                id: res.dataValues.id,
                title: res.dataValues.title,
                summary: res.dataValues.summary,
                healthScore: res.dataValues.healthScore,
                image: res.dataValues.image,
                steps: res.dataValues.steps, 
                diets: res.dataValues.diets.map((diet) => {
                    return {
                        name: diet.name,
                    };
                }),
            };
        });
    } catch (error) {
        // En caso de error, retornamos un objeto con el mensaje de error
        return { error: error.message };
    }
};

// Exportamos la función para poder utilizarla en otras partes de la aplicación
module.exports = getAllRecipesDB;