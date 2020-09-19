const express = require('express')
const router = express.Router()

//Controllers
const { createDiaChi } = require('../controllers/DiaChi.controller')
const { updateDiaChi } = require('../controllers/DiaChi.controller')
const { getAllDiaChi } = require('../controllers/DiaChi.controller')
const { getDiaChiById } = require('../controllers/DiaChi.controller')

//Models
const models = require('../models/index')
const DiaChi = models.DiaChi

//Insert
router.post('/', createDiaChi)

//Update data in DB
router.put('/:id', updateDiaChi)

// Query all data from DB
router.get('/', getAllDiaChi)

//Get by Id?
router.get('/:id', getDiaChiById)

module.exports = router;