const { Router } = require('express');

//importacion de rutas
const { getRecipesById } = require('../controllers/getRecipesById')
const { createRecipe } = require('../controllers/createRecipe')
const { getRecipesByName } = require('../controllers/getRecipesByName')
const { filterDiets } = require('./handler/recipeHandler')

const router = Router();


router.get('/recipes/:id', getRecipesById);
router.post('/createrec', createRecipe);
router.get('/recipes', getRecipesByName)
router.get('/diets', filterDiets)

module.exports = router;
