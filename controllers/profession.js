const Profession = require('../models/profession')

module.exports.getAll = async (req, res) => {
    const profession = await Profession.findAll()
    res.status(200).json(profession)
}
