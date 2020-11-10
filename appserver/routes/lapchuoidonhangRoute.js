const express = require('express')
const router = express.Router()

//Controllers
const { getDistance } = require('../controllers/lapchuoidonhang.controller')
const { getDonhang } = require('../controllers/lapchuoidonhang.controller')
const { getRoute } = require('../controllers/lapchuoidonhang.controller')

router.get('/', getDistance)

router.post('/donhang', getDonhang)

router.get('/route', getRoute)
module.exports = router;