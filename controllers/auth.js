const bcrypt = require('bcryptjs')
const jsonWebToken = require('jsonwebtoken')
const User = require('../models/user')
const KEYS = require('../config/keys')

module.exports.login = async (req, res) => {
    const user = await User.findOne({where: {login: req.body.login}});
    if (user) {
        const isRightPassword = bcrypt.compareSync(req.body.password, user.password);
        if (isRightPassword) {
            const token = 'Bearer ' + jsonWebToken.sign({
                login: user.login,
                userId: user.id
            }, KEYS.jsonWebToken, {expiresIn: 3600 * 8})
            res.status(200).json({token})
        }
        res.status(401).json({message: 'Incorrect password.'})
    }
    res.status(404).json({message: 'Incorrect login.'})
}

module.exports.register = async (req, res) => {
    const userWithSameLogin = await User.findOne({where: {login: req.body.login}});

    if (!userWithSameLogin) {
        const user = req.body;
        user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        await User.create(user)
        res.status(201).json({
            name: user.name,
            login: user.login
        })
    }
    res.status(409).json({message: 'User with the same login already exist.'})
}

module.exports.getAll = async (req, res) => {
    const users = await User.findAll()
    res.status(200).json({users})
}
