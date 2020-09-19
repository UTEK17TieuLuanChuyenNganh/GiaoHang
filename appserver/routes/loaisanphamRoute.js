const express = require('express')
const router = express.Router()

//Controllers
const { createLoaiSanPham } = require('../controllers/loaisanpham.controller')
const { updateLoaiSanPham } = require('../controllers/loaisanpham.controller')
const { getAllLoaiSanPham } = require('../controllers/loaisanpham.controller')
const { getLoaiSanPhamById } = require('../controllers/loaisanpham.controller')

//Models
const models = require('../models/index')
const LoaiSanPham = models.LoaiSanPham

//Insert
router.post('/', createLoaiSanPham)

//Update data in DB
router.put('/:id', updateLoaiSanPham)

// Query all data from DB
router.get('/', getAllLoaiSanPham)

//Get by Id?
router.get('/:id', getLoaiSanPhamById)

module.exports = router;