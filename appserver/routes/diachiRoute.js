const express = require('express')
const router = express.Router()

//Controllers
const { createDiaChi } = require('../controllers/diachi.controller')
const { updateDiaChi } = require('../controllers/diachi.controller')
const { getAllDiaChi } = require('../controllers/diachi.controller')
const { getDiaChiById } = require('../controllers/diachi.controller')
const { getDiaChiByNguoiDungId } = require('../controllers/diachi.controller')

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

router.get('/:id/nguoidung', getDiaChiByNguoiDungId)

module.exports = router;