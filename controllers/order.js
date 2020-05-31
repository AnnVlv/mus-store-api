const Order = require('../models/order')
const User = require('../models/user')
const Position = require('../models/position')
const OrdersAndPositions = require('../models/orders_and_positions')
const funcs = require('../utils/functions')

module.exports.get = async (req, res) => {
    const where = {}
    if (req.query.userId)
        where.manager = req.query.userId
    else
        where.manager = funcs.getUserId(req.headers.authorization)
    
    let orders = await Order.findAll({where})

    for (let i = 0; i < orders.length; i++)
        orders[i].dataValues.userName = (await User.findByPk(+orders[i].manager)).name

    const now = new Date()
    if (req.query.isForMonth)
        orders = orders.filter(order => order.createdAt.getYear() === now.getYear() && order.createdAt.getMonth() === now.getMonth())

    res.status(200).json(orders)
}

module.exports.getPositionsOfOrder = async (req, res) => {
    const where = {}
    if (req.query.order)
        where.OrderId = req.query.order

    const positions = await OrdersAndPositions.findAll({where})
    res.status(200).json(positions)
}

module.exports.create = async (req, res) => {
    const userId = funcs.getUserId(req.headers.authorization)
    const user = await User.findByPk(userId)

    const order = await Order.create({
        manager: userId,
        store: user.store
    })

    res.status(201).json(order)
}

module.exports.addPositionToOrder = async (req, res) => {
    const position = await Position.findByPk(req.body.position)

    const addedPosition = await OrdersAndPositions.create({
        OrderId: req.body.order,
        position_name: position.name,
        position_price: position.price,
        position_count: req.body.count
    })

    res.status(201).json(addedPosition)
}
