const express = require("express");
const dietsRouter = express.Router();

const { filterDiets } = require('./handler/recipeHandler');

//ruta para obtener las dietas ej: http://localhost:3000/diets
dietsRouter.get('/', filterDiets);

module.exports = dietsRouter;