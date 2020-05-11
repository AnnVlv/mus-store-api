const Position = require('../models/position')
const Category = require('../models/category')
const User = require('../models/user')
const funcs = require('../utils/functions')

module.exports.getAll = async (req, res) => {
    let where = {}
    if (req.query.categoryId)
        where.category = +req.query.categoryId
    if (req.query.isDeleted)
        where.isDeleted = req.query.isDeleted === 'false' ? false : true

    const positions = await Position.findAll({where})
    for (let i = 0; i < positions.length; i++) {
        positions[i].dataValues.creator = (await User.findByPk(+positions[i].createdBy)).name
        positions[i].dataValues.updater = (await User.findByPk(+positions[i].updatedBy)).name
        const deleter = await User.findByPk(+positions[i].deletedBy)
        positions[i].dataValues.deleter = deleter ? deleter.name : null
    }

    res.status(200).json(positions)
}

module.exports.getById = async (req, res) => {
    const position = await Position.findByPk(+req.params.id)
    if (position) {
        res.status(200).json(position)
    }
    res.status(404).json({message: 'Position not found.'})
}

module.exports.create = async (req, res) => {
    const category = await Category.findByPk(+req.body.category)
    if (category.isDeleted)
        res.status(409).json({message: 'Can\'t create position in deleted category.'})

    const userId = funcs.getUserId(req.headers.authorization)
    const position = await Position.create({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        isDeleted: false,
        createdBy: userId,
        updatedBy: userId
    })
    res.status(201).json(position)
}

module.exports.update = async (req, res) => {
    let position = await Position.findByPk(+req.params.id)

    if (!position)
        res.status(404).json({message: 'Position not found.'})
    if (position.isDeleted)
        res.status(409).json({message: 'You can\'t edit deleted positions.'})
    if (!req.body.name || req.body.price)
        res.status(409).json({message: 'Name and price can\'t be empty!'})
    
    position.name = req.body.name
    position.category = req.body.category
    position.price = req.body.price
    position.updatedBy = funcs.getUserId(req.headers.authorization)

    position.save()
    res.status(200).json(position)
}

module.exports.delete = async (req, res) => {
    const position = await Position.findByPk(+req.params.id)

    if (!position)
        res.status(404).json({message: 'Position not found.'})

    if (position.isDeleted) {
        await position.destroy(position.id)
        res.status(200).json()
    } else {
        position.isDeleted = true
        position.deletedBy = funcs.getUserId(req.headers.authorization)
        position.deletedAt = new Date()
        await position.save()
        res.status(200).json(position)
    }
}
