const express = require('express')
const router = express.Router()

//Controllers
const { getDistance } = require('../controllers/lapchuoidonhang.controller')
const { getDonhang } = require('../controllers/lapchuoidonhang.controller')

router.get('/', getDistance)

router.get('/donhang', getDonhang)

module.exports = router;