const express = require('express');
const recipesRouter = express.Router();

const { filterById } = require('./handler/recipeHandler')
const { filterByName } = require('./handler/recipeHandler')
const { postRecipe } = require('./handler/recipeHandler')

//ruta para obtener por id ej: http://localhost:3000/recipe/4235
recipesRouter.get('/:idRecipe', filterById);

//ruta para obtener por name ej: http://localhost:3000/recipe?name=Pasta
recipesRouter.get('/', filterByName);

//ruta para obtener por id ej: http://localhost:3000/recipe/
recipesRouter.post('/', postRecipe);

module.exports = recipesRouter;