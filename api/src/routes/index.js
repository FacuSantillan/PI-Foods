const { Router } = require('express');
const recipesRouter = require("./recipesRouter")
const dietsRouter = require("./dietsRouter")

const router = Router();

//ej: http://localhost:3000/recipe/...
router.use('/recipes', recipesRouter);

//ej: http://localhost:3000/diets/...
router.use('/diets', dietsRouter);


module.exports = router;
