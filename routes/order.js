const express = require('express')
const passport = require('passport')
const controller = require('../controllers/order')

const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}), controller.get)
router.get('/positionsOfOrder', passport.authenticate('jwt', {session: false}), controller.getPositionsOfOrder)
router.post('/', passport.authenticate('jwt', {session: false}), controller.create)
router.post('/positionToOrder', passport.authenticate('jwt', {session: false}), controller.addPositionToOrder)

module.exports = router
