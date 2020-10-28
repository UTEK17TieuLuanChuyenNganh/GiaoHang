const express = require('express')
const router = express.Router()

//Controllers
const { createChuoiGiaoHang } = require('../controllers/chuoigiaohang.controller')
const { updateChuoiGiaoHang } = require('../controllers/chuoigiaohang.controller')
const { getAllChuoiGiaoHang } = require('../controllers/chuoigiaohang.controller')
const { getChuoiGiaoHangById } = require('../controllers/chuoigiaohang.controller')
const { getChuoiGiaoHangByIdShipper } = require('../controllers/chuoigiaohang.controller')


//Models
const models = require('../models/index')
const ChuoiGiaoHang = models.ChuoiGiaoHang

//Insert
router.post('/', createChuoiGiaoHang)

//Update data in DB
router.put('/:id', updateChuoiGiaoHang)

// Query all data from DB
router.get('/', getAllChuoiGiaoHang)

//Get by Id?
router.get('/:id', getChuoiGiaoHangById)

router.get('/:id/shipper', getChuoiGiaoHangByIdShipper)
module.exports = router;