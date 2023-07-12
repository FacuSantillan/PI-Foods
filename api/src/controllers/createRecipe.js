const { Recipe } = require('../db')
const { Op } = require("sequelize");

const createRecipe = async (req, res) => {
    
//informacion que llega por body
const { name, resumenPlato, nivelSaludable, pasoApaso, image } = req.body

//si falta alguna informacion mostrara el error
if (!(title && image && summary && healthScore && steps && diets)) {
    return res.status(400).send('Faltan datos para poder crear la receta');
}

//en caso que no falte informacion pero haya una receta con el mismo nombre
    try{
  const recipeExist = await Recipe.findAll({
      where: {
        name: {
            [Op.iLike]: `${name}`,    
        }
     }
    })
    if(recipeExist.length) {throw new Error("There is already a recipe with that name.")};

//aqui procede a crear la nueva receta y la almacena en la base de datos
        const newRecipe = await Recipe.create({ 
            name, 
            resumenPlato, 
            nivelSaludable, 
            pasoApaso, 
            image,
    });

//muestra la receta ya creada
    return res.status(200).json(newRecipe)
}
//en caso que haya algun error
    catch(error){
        res.status(500).json({ error: error.message })
}}

module.exports = {
    createRecipe
} 