const { getAllrecipes } = require('./getAllRecipes')

const getRecipesByName = async(req, res) => {
    try {
        const name = req.query.name;
        const response = await getAllrecipes();

        //si no existe el nombre, debe retornar todas las recetas
        if(!name) {
            return res.status(200).json(response);
        }
        //realizamos el filtrado
        let filter = response.filter((resp) => 
            resp.title.toLowerCase().includes(name.toLowerCase())
        );

        filter.length
            ? res.status(200).json(filter)
            : res.status(400).json({
                msg: `No existe una receta que contenga ese nombre`,
            });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};
module.exports = {
    getRecipesByName
}