const express = require('express')
const router = express.Router()

//Controllers
const { createThongBao } = require('../controllers/thongbao.controller')
const { updateThongBao } = require('../controllers/thongbao.controller')
const { getAllThongBao } = require('../controllers/thongbao.controller')
const { getThongBaoById } = require('../controllers/thongbao.controller')
const { getThongBaoByNguoiDungId } = require('../controllers/thongbao.controller')
const { getAllNewThongBao } = require('../controllers/thongbao.controller')
//Models
const models = require('../models/index')
const ThongBao = models.ThongBao

//Insert
router.post('/', createThongBao)

//Update data in DB
router.put('/:id', updateThongBao)

// Query all data from DB
router.get('/', getAllThongBao)

//Get by Id?
router.get('/:id', getThongBaoById)

router.get('/:id/nguoidung', getThongBaoByNguoiDungId)

router.get('/:id/new', getAllNewThongBao)

module.exports = router;