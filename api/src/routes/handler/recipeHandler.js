const { getDiets } = require('../../controllers/getDiet')

const filterDiets = async(req, res) => {
    try {
        const dietsData = await getDiets();
        return res.status(200).json(dietsData);

    } catch (error) {
        return res.status(500).json({error: error.message })
    }
    
}

module.exports = {
    filterDiets
}