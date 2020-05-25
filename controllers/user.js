const User = require('../models/user')

module.exports.getAll = async (req, res) => {
    const users = await User.findAll()
    res.status(200).json(users)
}
