const { getAllRecipes } = require('./getAllRecipes')

const getRecipesByName = async(req) => {
    try {
        const name = req.query.name;
        const response = await getAllRecipes();

        // Si no existe el nombre, retornar todas las recetas
        if (!name) {
            return response;
        }

        // Realizar el filtrado de recetas que coinciden con el nombre buscado (insensible a mayúsculas/minúsculas)
        let filter = response.filter((resp) =>
            resp.title.toLowerCase().includes(name.toLowerCase())
        );

        // Si se encontraron recetas que coinciden, retornarlas, de lo contrario, retornar un mensaje de error
        return filter.length
            ? filter
            : { error: `No existe una receta que contenga ese nombre` };
    } catch (error) {
        // Si ocurre un error durante el proceso, retornar un objeto con un mensaje de error
        return { error: error.message };
    }
};

module.exports = {
    getRecipesByName,
};