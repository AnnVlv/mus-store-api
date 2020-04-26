const Category = require('../models/category')
const Position = require('../models/position')
const User = require('../models/user')
const funcs = require('../utils/functions')

module.exports.getAll = async (req, res) => {
    let where = {}
    if (req.query.isDeleted)
        where.isDeleted = req.query.isDeleted === 'false' ? false : true
    
    const categories = await Category.findAll({where})
    for (let i = 0; i < categories.length; i++) {
        categories[i].dataValues.creator = (await User.findByPk(+categories[i].createdBy)).name
        categories[i].dataValues.updater = (await User.findByPk(+categories[i].updatedBy)).name
        const deleter = await User.findByPk(+categories[i].deletedBy)
        categories[i].dataValues.deleter = deleter ? deleter.name : null
    }

    res.status(200).json(categories)
}

module.exports.getById = async (req, res) => {
    const category = await Category.findByPk(+req.params.id)
    if (category) {
        category.dataValues.creator = (await User.findByPk(+category.createdBy)).name
        category.dataValues.updater = (await User.findByPk(+category.updatedBy)).name
        const deleter = await User.findByPk(+category.deletedBy)
        category.dataValues.deleter = deleter ? deleter.name : null
        res.status(200).json(category)
    }
    res.status(404).json({message: 'Category not found.'})
}

module.exports.create = async (req, res) => {
    const userId = funcs.getUserId(req.headers.authorization)
    const category = await Category.create({
        name: req.body.name,
        image: req.file ? req.file.path : null,
        isDeleted: false,
        createdBy: userId,
        updatedBy: userId
    })
    res.status(201).json(category)
}

module.exports.update = async (req, res) => {
    let category = await Category.findByPk(+req.params.id)

    if (!category)
        res.status(404).json({message: 'Category not found.'})
    if (category.isDeleted)
        res.status(409).json({message: 'You can\'t edit deleted categories.'})

    if (req.file) {
        category.image = req.file.path
    }
    category.name = req.body.name
    category.updatedBy = funcs.getUserId(req.headers.authorization)

    await category.save()
    res.status(200).json(category)
}

module.exports.delete = async (req, res) => {
    const category = await Category.findByPk(+req.params.id)
    if (!category)
        res.status(404).json({message: 'Category not found.'})

    if (category.isDeleted) {
        await category.destroy(category.id)
        res.status(200).json()
    } else {
        const userId = funcs.getUserId(req.headers.authorization)

        const positions = await Position.findAll({
            where: {
                category: category.id
            }
        })
        positions.forEach(async position => {
            position.isDeleted = true
            position.deletedBy = userId
            position.deletedAt = new Date()
            await position.save()
        })

        category.isDeleted = true
        category.deletedBy = userId
        category.deletedAt = new Date()
        await category.save()
        res.status(200).json(category)
    }
}
