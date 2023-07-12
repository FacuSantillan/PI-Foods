const { Recipe, Diets } = require('../../db')

const getAllRecipesDB = async(res) => {
    try {
        
        //traemos toda la informacion de la base de datos y la guardamos en una constante
        const response = await Recipe.findAll({
            attributes: [
                'id',
                'title',
                'image', 
                'summary', 
                'healthScore'
                //incluyendo la tabla de Diets
            ], include:{ model: Diets }
        });

        //mapeamos la informacion que nos trajo la api y nos quedamos solo con la info que necesitamos 
        return response?.map((res)=>{
            return {
                 id:res.dataValues.id,
                 title:res.dataValues.title,
                 summary:res.dataValues.sumarry,
                 healthScore:res.dataValues.healthScore,
                 image:res.dataValues.image,
                 steps:res.dataValues.steps,
                 diets: res.dataValues.diets.map((diet) => {
                    return {
                        name:diet.name
                    }
                 })
            }
        })
    } catch (error) {
        return { error: error.message }
    }
}

module.exports = getAllRecipesDB