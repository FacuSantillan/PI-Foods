require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Diets } = require('../db');

const getDiets = async() => {

    //requerimos los datos de la DB en caso que haya
    const existingDiets = await Diets.findAll();

    if(existingDiets.length > 0) {
        const diets = [];
        existingDiets.forEach((diet) => diets.push({
                                        name:diet.name,
                                        id: diet.id }))
    return diets

    //caso contrario traemos las dietas de la api
    } else{
        const apiDiets = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
        const diets = apiDiets.data.results.map((recipe)=>recipe.diets).flat();
        
        //quitamos los datos duplicados
        const deleteDuplicated = [...new Set(diets)];

        deleteDuplicated.forEach((elem)=>{
            Diets.findOrCreate({
                where:{
                    name : elem,
                }
            })
        })
        return deleteDuplicated
    };
    
};

module.exports = {
    getDiets,
}