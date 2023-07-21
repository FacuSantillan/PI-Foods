const { getDiets } = require('../../controllers/getDiet')
const { getRecipesById } = require('../../controllers/getRecipesById')
const { createRecipe } = require('../../controllers/createRecipe')
const { getRecipesByName } = require('../../controllers/getRecipesByName')

const filterDiets = async (req, res) => {
    try {
        // Llamamos a la función que obtiene las dietas desde el controlador getDiet
        const response = await getDiets();

        // Enviamos la respuesta con un código de estado 200 y la lista de dietas en formato JSON
        res.status(200).json(response);
    } catch (error) {
        // En caso de error, enviamos una respuesta con código de estado 500 y un mensaje de error en formato JSON
        res.status(500).json({ error: error.message });
    };
};

// Controlador para obtener una receta por su ID
const filterById = async (req, res) => {
    try {
        // Recibimos el ID de la receta desde los parámetros de la URL
        const { idRecipe } = req.params;

        // Llamamos a la función que busca la receta por ID desde el controlador getRecipesById
        const response = await getRecipesById(idRecipe);

        // Enviamos la respuesta con un código de estado 200 y los detalles de la receta en formato JSON
        res.status(200).json(response);
    } catch (error) {
        // En caso de error, enviamos una respuesta con código de estado 500 y un mensaje de error en formato JSON
        res.status(500).json({ err: error.message });
    }
};

// Controlador para crear una nueva receta
const postRecipe = async (req, res) => {
    try {
        // Obtenemos los datos de la receta desde el cuerpo de la solicitud
        const { title, image, summary, healthScore, steps, diets } = req.body;

        // Verificamos si todos los campos necesarios están presentes
        if (!(title && image && summary && healthScore && steps && diets)) {
            return res.status(400).send('Faltan datos para poder crear la receta');
        }

        // Creamos un objeto con la información de la receta
        const recipeObj = {
            title,
            image,
            summary,
            healthScore,
            steps,
            diets,
        };

        // Llamamos a la función que crea una nueva receta desde el controlador createRecipe
        const newRecipe = await createRecipe(recipeObj);

        // Enviamos la respuesta con un código de estado 200 y los detalles de la nueva receta creada en formato JSON
        res.status(200).json(newRecipe);
    } catch (error) {
        // En caso de error, enviamos una respuesta con código de estado 500 y un mensaje de error en formato JSON
        res.status(500).json({ error: error.message });
    }
};

// Controlador para obtener recetas por nombre
const filterByName = async (req, res) => {
    try {
        // Llamamos a la función que obtiene las recetas por nombre desde el controlador getRecipesByName
        const response = await getRecipesByName(req);

        // Enviamos la respuesta con un código de estado 200 y la lista de recetas filtradas por nombre en formato JSON
        res.status(200).json(response);
    } catch (error) {
        // En caso de error, enviamos una respuesta con código de estado 500 y un mensaje de error en formato JSON
        res.status(500).json({ error: error.message });
    }
};

// Exportamos los controladores para poder utilizarlos en otras partes de la aplicación
module.exports = {
    filterDiets,
    filterById,
    postRecipe,
    filterByName
};