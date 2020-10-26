const express = require('express')
const router = express.Router()

//Controllers
const { createDonHang } = require('../controllers/donhang.controller')
const { updateDonHang } = require('../controllers/donhang.controller')
// const { disableDonHang } = require('../controllers/donhang.controller')
// const { enableDonHang } = require('../controllers/donhang.controller')
const { getAllDonHang } = require('../controllers/donhang.controller')
const { getDonHangById } = require('../controllers/donhang.controller')
const { getDonHangByNguoiDungId } = require('../controllers/donhang.controller')
const { searchDonHang } = require('../controllers/donhang.controller')

//Models
const models = require('../models/index')
const DonHang = models.DonHang

//Insert
router.post('/', createDonHang)

//Update data in DB
router.put('/:id', updateDonHang)

// // disable a DonHang
// router.put('/:id/disable', disableDonHang)

// // enable a DonHang
// router.put('/:id/enable', enableDonHang)

// Query all data from DB
router.get('/', getAllDonHang)

//Get by Id?
router.get('/:id', getDonHangById)

router.get('/:id/nguoidung', getDonHangByNguoiDungId)

router.post('/search', searchDonHang)

module.exports = router;