const express = require('express')
const router = express.Router()

//Controllers
const { createDiaChi } = require('../controllers/diachi.controller')
const { updateDiaChi } = require('../controllers/diachi.controller')
const { getAllDiaChi } = require('../controllers/diachi.controller')
const { getDiaChiById } = require('../controllers/diachi.controller')
const { getDiaChiByNguoiDungId } = require('../controllers/diachi.controller')
const { getDiaChiByDonHangId } = require('../controllers/diachi.controller')
const { searchDiachiInTimeRange } = require('../controllers/diachi.controller')
const { updateDiaChiByDonHangId } = require('../controllers/diachi.controller')
const { deleteDiaChi } = require('../controllers/diachi.controller')

//Models
const models = require('../models/index')
const DiaChi = models.DiaChi

//Insert
router.post('/', createDiaChi)

//Update data in DB
router.put('/:id', updateDiaChi)

router.post('/delete', deleteDiaChi)

// Query all data from DB
router.get('/', getAllDiaChi)

//Get by Id?
router.get('/:id', getDiaChiById)

router.get('/:id/nguoidung', getDiaChiByNguoiDungId)

router.get('/:id/donhang', getDiaChiByDonHangId)

router.post('/search', searchDiachiInTimeRange)

router.put('/:id/update', updateDiaChiByDonHangId)

module.exports = router;