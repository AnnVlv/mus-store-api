const Store = require('../models/store')

module.exports.getAll = async (req, res) => {
    const stores = await Store.findAll()
    res.status(200).json(stores)
}
