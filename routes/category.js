const express = require('express')
const passport = require('passport')
const controller = require('../controllers/category')
const upload = require('../middleware/upload')

const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById)
router.post('/', upload.single('image'), passport.authenticate('jwt', {session: false}), controller.create)
router.put('/:id', upload.single('image'), passport.authenticate('jwt', {session: false}), controller.update)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.delete)

module.exports = router
