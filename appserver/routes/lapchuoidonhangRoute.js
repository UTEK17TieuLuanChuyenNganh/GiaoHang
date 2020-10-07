const express = require('express')
const router = express.Router()

//Controllers
const { getDistance } = require('../controllers/lapchuoidonhang.controller')

router.get('/', getDistance)

module.exports = router;