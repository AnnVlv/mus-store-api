const Position = require('../models/position')
const Category = require('../models/category')
const funcs = require('../utils/functions')

module.exports.getAll = async (req, res) => {
    let where = {}
    if (req.query.categoryId)
        where.CategoryId = +req.query.categoryId
    if (req.query.isDeleted)
        where.isDeleted = req.query.isDeleted === 'false' ? false : true

    const positions = await Position.findAll({where})
    res.status(200).json(positions)
}

module.exports.getById = async (req, res) => {
    const position = await Position.findByPk(+req.params.id)
    res.status(200).json(position)
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
        await position.save()
        res.status(200).json(position)
    }
}
