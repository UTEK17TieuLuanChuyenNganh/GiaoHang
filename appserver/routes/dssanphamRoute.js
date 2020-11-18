const express = require('express')
const router = express.Router()

//Controllers
const { createDSSanPham } = require('../controllers/dssanpham.controller')
const { updateDSSanPham } = require('../controllers/dssanpham.controller')
const { getAllDSSanPham } = require('../controllers/dssanpham.controller')
const { getDSSanPhamById } = require('../controllers/dssanpham.controller')
const { getDSSanPhamByDonHangId } = require('../controllers/dssanpham.controller')
const { getDSSanPhamByNguoiDungId } = require('../controllers/dssanpham.controller')
const { createMultiDSSanPham } = require('../controllers/dssanpham.controller')
const { searchDSSanPham } = require('../controllers/dssanpham.controller')

//Models
const models = require('../models/index')
const DSSanPham = models.DSSanPham

//Insert
router.post('/', createDSSanPham)

//MultiInsert
router.post('/multi', createMultiDSSanPham)

//Update data in DB
router.put('/:id', updateDSSanPham)

// Query all data from DB
router.get('/', getAllDSSanPham)

//Get by Id?
router.get('/:id', getDSSanPhamById)

router.get('/:id/donhang', getDSSanPhamByDonHangId)

router.get('/:id/nguoidung/:page/page', getDSSanPhamByNguoiDungId)

router.post('/search/:page/page', searchDSSanPham)
module.exports = router;