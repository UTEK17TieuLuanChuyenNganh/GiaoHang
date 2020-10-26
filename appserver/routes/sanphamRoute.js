const express = require('express')
const router = express.Router()

//Controllers
const { createSanPham } = require('../controllers/sanpham.controller')
const { updateSanPham } = require('../controllers/sanpham.controller')
const { disableSanPham } = require('../controllers/sanpham.controller')
const { enableSanPham } = require('../controllers/sanpham.controller')
const { getAllSanPham } = require('../controllers/sanpham.controller')
const { getSanPhamById } = require('../controllers/sanpham.controller')
const { getSanPhamByType } = require('../controllers/sanpham.controller')
const { searchSanPham } = require('../controllers/sanpham.controller')

//Models
const models = require('../models/index')
const SanPham = models.SanPham

//Insert
router.post('/', createSanPham)

//Update data in DB
router.put('/:id', updateSanPham)

// disable a SanPham
router.put('/:id/disable', disableSanPham)

// enable a SanPham
router.put('/:id/enable', enableSanPham)

// Query all data from DB
router.get('/', getAllSanPham)

//Get by Id?
router.get('/:id', getSanPhamById)

router.get('/:typeId/type', getSanPhamByType)

router.get('/:name/search', searchSanPham)

module.exports = router;