const express = require('express')
const passport = require('passport')
const controller = require('../controllers/store')

const router = express.Router()

router.get('/', controller.getAll)

module.exports = router
